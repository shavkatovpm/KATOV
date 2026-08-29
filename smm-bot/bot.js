import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QUEUE_PATH = path.join(__dirname, 'data', 'queue.json');

const BOT_TOKEN = process.env.BOT_TOKEN;
const ADMIN_ID = Number(process.env.ADMIN_ID);
const CHANNEL_USERNAME = process.env.CHANNEL_USERNAME || '@katovuz';

if (!BOT_TOKEN || !ADMIN_ID) {
  console.error('BOT_TOKEN yoki ADMIN_ID .env faylida yo\'q. .env.example ga qarang.');
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

function loadQueue() {
  return JSON.parse(readFileSync(QUEUE_PATH, 'utf-8'));
}

function saveQueue(queue) {
  writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2));
}

function findItem(queue, id) {
  return queue.find((item) => item.id === id);
}

function findNextPending(queue) {
  return queue.find((item) => item.status === 'pending');
}

function fullCaption(item) {
  return `${item.hook}\n\n${item.body}\n\n${item.cta_text}: ${item.cta_link}`;
}

function isAdmin(msgOrQuery) {
  const fromId = msgOrQuery.from ? msgOrQuery.from.id : null;
  return fromId === ADMIN_ID;
}

async function sendVariantsForSelection(chatId, item) {
  await bot.sendMessage(chatId, `Navbatdagi mavzu: *${item.topic}*\n\nQuyida 3 ta dizayn variant. Birini tanlang.`, {
    parse_mode: 'Markdown',
  });

  for (const img of item.images) {
    const absPath = path.join(__dirname, img.square_1x1_path);
    if (!existsSync(absPath)) {
      await bot.sendMessage(chatId, `⚠️ Rasm topilmadi: ${img.square_1x1_path}`);
      continue;
    }
    await bot.sendPhoto(chatId, absPath, {
      caption: `Variant ${img.variant}`,
      reply_markup: {
        inline_keyboard: [[
          { text: `✅ Variant ${img.variant} ni tanlash`, callback_data: `select|${item.id}|${img.variant}` },
        ]],
      },
    });
  }
}

async function sendConfirmPrompt(chatId, item, variant) {
  const preview = fullCaption(item);
  await bot.sendMessage(
    chatId,
    `Tanlandi: Variant ${variant}\n\n---\n${preview}\n---\n\nShu post *${CHANNEL_USERNAME}* kanaliga yuborilsinmi?`,
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [[
          { text: '✅ Ha, kanalga yubor', callback_data: `confirm|${item.id}|yes` },
          { text: '❌ Yo\'q, faqat menga', callback_data: `confirm|${item.id}|no` },
        ]],
      },
    }
  );
}

async function handleSelect(query, itemId, variant) {
  const queue = loadQueue();
  const item = findItem(queue, itemId);
  if (!item) {
    await bot.answerCallbackQuery(query.id, { text: 'Mavzu topilmadi.' });
    return;
  }

  item.selectedVariant = Number(variant);
  item.status = 'awaiting_confirm';
  saveQueue(queue);

  await bot.answerCallbackQuery(query.id, { text: `Variant ${variant} tanlandi` });
  await bot.editMessageReplyMarkup(
    { inline_keyboard: [[{ text: `✅ Tanlandi (Variant ${variant})`, callback_data: 'noop' }]] },
    { chat_id: query.message.chat.id, message_id: query.message.message_id }
  );

  await sendConfirmPrompt(query.message.chat.id, item, item.selectedVariant);
}

async function handleConfirm(query, itemId, decision) {
  const queue = loadQueue();
  const item = findItem(queue, itemId);
  if (!item) {
    await bot.answerCallbackQuery(query.id, { text: 'Mavzu topilmadi.' });
    return;
  }

  const chatId = query.message.chat.id;
  const variant = item.selectedVariant;
  const images = item.images.find((img) => img.variant === variant);

  await bot.answerCallbackQuery(query.id);
  await bot.editMessageReplyMarkup({ inline_keyboard: [] }, {
    chat_id: chatId,
    message_id: query.message.message_id,
  });

  if (!images) {
    await bot.sendMessage(chatId, 'Xato: tanlangan variant rasm fayllari topilmadi.');
    return;
  }

  const squarePath = path.join(__dirname, images.square_1x1_path);
  const igPath = path.join(__dirname, images.instagram_4x5_path);

  if (decision === 'yes') {
    if (existsSync(squarePath)) {
      await bot.sendPhoto(CHANNEL_USERNAME, squarePath, { caption: fullCaption(item) });
    }
    item.status = 'posted';
    item.postedAt = new Date().toISOString();
    await bot.sendMessage(chatId, `✅ ${CHANNEL_USERNAME} kanaliga yuborildi.`);
  } else {
    if (existsSync(squarePath)) {
      await bot.sendPhoto(chatId, squarePath, { caption: fullCaption(item) });
    }
    item.status = 'saved_only';
    await bot.sendMessage(chatId, '👍 Kanalga yuborilmadi, post sizga saqlandi.');
  }

  if (existsSync(igPath)) {
    await bot.sendDocument(chatId, igPath);
  } else {
    await bot.sendMessage(chatId, `⚠️ Instagram (4:5) fayl topilmadi: ${images.instagram_4x5_path}`);
  }

  saveQueue(queue);
}

bot.on('callback_query', async (query) => {
  if (!isAdmin(query)) {
    await bot.answerCallbackQuery(query.id, { text: 'Ruxsat yo\'q.' });
    return;
  }

  const [action, itemId, value] = (query.data || '').split('|');

  try {
    if (action === 'select') {
      await handleSelect(query, itemId, value);
    } else if (action === 'confirm') {
      await handleConfirm(query, itemId, value);
    } else {
      await bot.answerCallbackQuery(query.id);
    }
  } catch (err) {
    console.error(err);
    await bot.answerCallbackQuery(query.id, { text: 'Xato yuz berdi.' });
  }
});

bot.onText(/^\/next$/, async (msg) => {
  if (!isAdmin(msg)) return;
  const queue = loadQueue();
  const next = findNextPending(queue);
  if (!next) {
    await bot.sendMessage(msg.chat.id, 'Navbatda TODO mavzu yo\'q.');
    return;
  }
  await sendVariantsForSelection(msg.chat.id, next);
});

bot.onText(/^\/queue$/, async (msg) => {
  if (!isAdmin(msg)) return;
  const queue = loadQueue();
  const lines = queue.map((item) => `- [${item.status}] ${item.topic}`);
  await bot.sendMessage(msg.chat.id, lines.join('\n') || 'Navbat bo\'sh.');
});

bot.onText(/^\/start$/, async (msg) => {
  if (!isAdmin(msg)) return;
  await bot.sendMessage(msg.chat.id, 'KATOV SMM bot ishga tushdi.\n/next — navbatdagi mavzuni ko\'rish\n/queue — navbat holatini ko\'rish');
});

console.log('KATOV SMM bot ishga tushdi (polling). To\'xtatish uchun Ctrl+C.');
