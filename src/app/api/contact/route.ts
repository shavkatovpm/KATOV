import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, phone, message, order } = await request.json();

    // Validate input
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Barcha maydonlarni to\'ldiring' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' });

    // Send to Telegram
    const telegramResult = await sendToTelegram(name, phone, message, timestamp, order);

    // Save to Google Sheets via Apps Script
    const sheetsResult = await saveToGoogleSheets(name, phone, message, timestamp);

    // Send email notification
    const emailResult = await sendEmail(name, phone, message, timestamp, order);

    if (!telegramResult.success && !sheetsResult.success && !emailResult.success) {
      console.error('All services failed - Telegram:', telegramResult.success, 'Sheets:', sheetsResult.success, 'Email:', emailResult.success);
      return NextResponse.json(
        { error: 'Xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Arizangiz qabul qilindi!'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Server xatoligi' },
      { status: 500 }
    );
  }
}

async function sendToTelegram(name: string, phone: string, message: string, timestamp: string, order?: Record<string, string>) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram credentials not configured - BOT_TOKEN:', !!botToken, 'CHAT_ID:', !!chatId);
    return { success: false };
  }

  let orderBlock = '';
  if (order) {
    const lines: string[] = [];
    if (order.type) lines.push(`🌐 *Sayt turi:* ${escapeMarkdown(order.type)}`);
    if (order.features) lines.push(`⚙️ *Funksiyalar:* ${escapeMarkdown(order.features.split(',').join(', '))}`);
    if (order.design) lines.push(`🎨 *Dizayn:* ${escapeMarkdown(order.design)}`);
    if (order.price) lines.push(`💰 *Narx:* $${escapeMarkdown(order.price)}`);
    if (order.days) lines.push(`📅 *Muddat:* ${escapeMarkdown(order.days)} kun`);
    if (lines.length > 0) {
      orderBlock = `\n\n📋 *Kalkulyator buyurtmasi:*\n${lines.join('\n')}`;
    }
  }

  const text = `
🆕 *Yangi ariza!*

👤 *Ism:* ${escapeMarkdown(name)}
📱 *Telefon:* ${escapeMarkdown(phone)}
💬 *Xabar:* ${escapeMarkdown(message)}${orderBlock}

🕐 *Vaqt:* ${timestamp}
  `.trim();

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'Markdown',
        }),
      }
    );

    const result = await response.json();
    if (!result.ok) {
      console.error('Telegram API error:', result);
    }
    return { success: result.ok };
  } catch (error) {
    console.error('Telegram error:', error);
    return { success: false };
  }
}

async function saveToGoogleSheets(name: string, phone: string, message: string, timestamp: string) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    console.error('Google Script URL not configured - SCRIPT_URL:', !!scriptUrl);
    return { success: false };
  }

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp,
        name,
        phone,
        message,
      }),
    });

    if (!response.ok) {
      console.error('Google Sheets API error - Status:', response.status);
    }
    return { success: response.ok };
  } catch (error) {
    console.error('Google Sheets error:', error);
    return { success: false };
  }
}

async function sendEmail(name: string, phone: string, message: string, timestamp: string, order?: Record<string, string>) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPassword) {
    console.error('Gmail credentials not configured - USER:', !!gmailUser, 'PASSWORD:', !!gmailPassword);
    return { success: false };
  }

  let orderHtml = '';
  if (order) {
    const lines: string[] = [];
    if (order.type) lines.push(`<li><strong>Sayt turi:</strong> ${order.type}</li>`);
    if (order.features) lines.push(`<li><strong>Funksiyalar:</strong> ${order.features.split(',').join(', ')}</li>`);
    if (order.design) lines.push(`<li><strong>Dizayn:</strong> ${order.design}</li>`);
    if (order.price) lines.push(`<li><strong>Narx:</strong> $${order.price}</li>`);
    if (order.days) lines.push(`<li><strong>Muddat:</strong> ${order.days} kun</li>`);
    if (lines.length > 0) {
      orderHtml = `<h3>📋 Kalkulyator buyurtmasi:</h3><ul>${lines.join('')}</ul>`;
    }
  }

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>🆕 Yangi ariza!</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>👤 Ism:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>📱 Telefon:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>💬 Xabar:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${message}</td></tr>
        <tr><td style="padding: 8px;"><strong>🕐 Vaqt:</strong></td><td style="padding: 8px;">${timestamp}</td></tr>
      </table>
      ${orderHtml}
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
    });

    await transporter.sendMail({
      from: `"KATOV.UZ" <${gmailUser}>`,
      to: gmailUser,
      subject: `Yangi ariza: ${name}`,
      html,
    });

    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false };
  }
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
}
