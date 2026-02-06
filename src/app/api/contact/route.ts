import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, phone, message } = await request.json();

    // Validate input
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Barcha maydonlarni to\'ldiring' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' });

    // Send to Telegram
    const telegramResult = await sendToTelegram(name, phone, message, timestamp);

    // Save to Google Sheets via Apps Script
    const sheetsResult = await saveToGoogleSheets(name, phone, message, timestamp);

    if (!telegramResult.success && !sheetsResult.success) {
      console.error('Both services failed - Telegram:', telegramResult.success, 'Sheets:', sheetsResult.success);
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

async function sendToTelegram(name: string, phone: string, message: string, timestamp: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram credentials not configured - BOT_TOKEN:', !!botToken, 'CHAT_ID:', !!chatId);
    return { success: false };
  }

  const text = `
🆕 *Yangi ariza!*

👤 *Ism:* ${escapeMarkdown(name)}
📱 *Telefon:* ${escapeMarkdown(phone)}
💬 *Xabar:* ${escapeMarkdown(message)}

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

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
}
