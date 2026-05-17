'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  ArrowRight,
  Phone,
  Mail,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  MessageCircle,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

const TG = siteConfig.social.telegram;
const TG_BOT = siteConfig.social.support; // https://t.me/katovuz_bot
const PHONE = `tel:${siteConfig.contact.phone.replace(/\s/g, '')}`;
const EMAIL = `mailto:${siteConfig.contact.email}`;

type VariantId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

const VARIANTS: { id: VariantId; name: string; tag: string; desc: string }[] = [
  { id: 1, name: 'Minimal', tag: 'asosiy', desc: 'Title + 2 CTA + Yopish. Eng tozarisi, oddiy va aniq.' },
  { id: 2, name: 'Avatar Hero', tag: 'branded', desc: 'KATOV K avatar + onlayn indikator + Telegram primary CTA.' },
  { id: 3, name: 'Grid 2x2', tag: 'multi', desc: '4 ta kontakt usuli grid\'da: Telegram, Qo\'ng\'iroq, Email, Forma.' },
  { id: 4, name: 'Quick Replies', tag: 'tezkor', desc: '5 ta tayyor xabar chip\'lari — bittasi bilan Telegram\'da ochiladi.' },
  { id: 5, name: 'Service Context', tag: 'smart', desc: 'Xizmat info card (ikon + nom + narx) + CTA. Eslatma.' },
  { id: 6, name: 'Trust Signals', tag: 'social proof', desc: 'Mini statistika (3 til, 1 kun javob, 100% mamnun) + CTA.' },
  { id: 7, name: 'Mini Form', tag: 'inline', desc: 'Ism + telefon kiritish + yuborish. Yoki Telegram fallback.' },
  { id: 8, name: 'Tabs', tag: 'kategoriya', desc: '3 tab: Telegram, Qo\'ng\'iroq, Email. Tabga qarab content.' },
  { id: 9, name: 'Big CTA', tag: 'bold', desc: 'Bitta katta CTA tugma — hech qanday distraksiya yo\'q.' },
  { id: 10, name: 'Animated Hero', tag: 'live', desc: 'Tepada animatsion chat bubbles + title + CTA.' },
];

/* ─────────────────────────  Sheet wrapper  ───────────────────────── */
function Sheet({
  children,
  onClose,
  maxWidth = 'max-w-md',
}: {
  children: React.ReactNode;
  onClose: () => void;
  maxWidth?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100]"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
        onClick={onClose}
      />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        className="absolute bottom-0 left-0 right-0"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className={`mx-auto px-4 sm:px-0 ${maxWidth}`}>
          <div
            className="rounded-t-3xl shadow-2xl overflow-hidden"
            style={{
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderBottom: 'none',
            }}
          >
            <div className="pt-3 pb-1.5">
              <div
                className="w-10 h-1 rounded-full mx-auto"
                style={{ backgroundColor: 'color-mix(in srgb, var(--color-fg) 25%, transparent)' }}
              />
            </div>
            {children}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CancelBtn({ onClose, label = 'Yopish' }: { onClose: () => void; label?: string }) {
  return (
    <button
      onClick={onClose}
      className="w-full text-center text-[12px] sm:text-sm text-muted hover:opacity-70 mt-3 sm:mt-4 py-2"
    >
      {label}
    </button>
  );
}

/* ─────────────────────────  V1 — Minimal  ───────────────────────── */
function V1Minimal({ onClose }: { onClose: () => void }) {
  return (
    <Sheet onClose={onClose}>
      <div className="px-5 sm:px-6 pb-5 sm:pb-6">
        <h3 className="text-lg sm:text-xl font-bold text-center mb-1 mt-3">Bog'lanish</h3>
        <p className="text-[12px] sm:text-sm text-muted text-center mb-5">
          Bepul konsultatsiya — 1 ish kuni ichida javob beramiz
        </p>
        <div className="flex flex-col gap-2.5">
          <a
            href={TG}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
          >
            <span className="flex items-center gap-3">
              <Send size={16} />
              <span className="font-semibold text-[13px] sm:text-sm">Telegram orqali yozish</span>
            </span>
            <ChevronRight size={16} />
          </a>
          <a
            href={PHONE}
            className="flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-fg) 8%, transparent)',
              color: 'var(--color-fg)',
              border: '1px solid var(--color-border)',
            }}
          >
            <span className="flex items-center gap-3">
              <Phone size={16} />
              <span className="font-semibold text-[13px] sm:text-sm">Qo'ng'iroq qilish</span>
            </span>
            <span className="text-[11px] sm:text-xs text-muted">{siteConfig.contact.phone}</span>
          </a>
        </div>
        <CancelBtn onClose={onClose} />
      </div>
    </Sheet>
  );
}

/* ─────────────────────────  V2 — Avatar Hero  ───────────────────────── */
function V2AvatarHero({ onClose }: { onClose: () => void }) {
  return (
    <Sheet onClose={onClose}>
      <div className="px-5 sm:px-6 pb-5 sm:pb-6">
        <div className="flex flex-col items-center mt-2">
          <div className="relative">
            <div
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl grid place-items-center font-bold text-2xl"
              style={{
                backgroundColor: 'var(--color-fg)',
                color: 'var(--color-bg)',
                fontFamily: 'var(--font-poppins), sans-serif',
                letterSpacing: '-0.05em',
              }}
            >
              K
            </div>
            <span
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full grid place-items-center"
              style={{ backgroundColor: 'var(--color-bg)', border: '2px solid var(--color-bg)' }}
            >
              <span className="w-3 h-3 rounded-full bg-green-500" />
            </span>
          </div>
          <p className="font-bold text-base sm:text-lg mt-3">@katov_uz</p>
          <p className="text-[11px] sm:text-xs text-green-500 mt-0.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            onlayn · odatda darrov javob beradi
          </p>
        </div>
        <a
          href={TG}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl mt-5 transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
        >
          <Send size={16} />
          <span className="font-semibold text-[13px] sm:text-sm">Telegram orqali yozish</span>
        </a>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <a
            href={PHONE}
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-[12px] sm:text-sm font-medium"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-fg) 6%, transparent)',
              border: '1px solid var(--color-border)',
            }}
          >
            <Phone size={13} /> Qo'ng'iroq
          </a>
          <a
            href={EMAIL}
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-[12px] sm:text-sm font-medium"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-fg) 6%, transparent)',
              border: '1px solid var(--color-border)',
            }}
          >
            <Mail size={13} /> Email
          </a>
        </div>
        <CancelBtn onClose={onClose} />
      </div>
    </Sheet>
  );
}

/* ─────────────────────────  V3 — Grid 2x2  ───────────────────────── */
function V3Grid({ onClose }: { onClose: () => void }) {
  const items = [
    { href: TG, icon: Send, label: 'Telegram', sub: 'eng tez', primary: true },
    { href: PHONE, icon: Phone, label: 'Qo\'ng\'iroq', sub: 'gaplashish' },
    { href: EMAIL, icon: Mail, label: 'Email', sub: 'batafsil yozish' },
    { href: '#contact', icon: MessageCircle, label: 'Forma', sub: 'sayt orqali' },
  ];
  return (
    <Sheet onClose={onClose}>
      <div className="px-5 sm:px-6 pb-5 sm:pb-6">
        <h3 className="text-lg sm:text-xl font-bold text-center mb-1 mt-3">Bog'lanish usuli</h3>
        <p className="text-[12px] sm:text-sm text-muted text-center mb-5">
          O'zingizga qulay variantni tanlang
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          {items.map((it) => (
            <a
              key={it.label}
              href={it.href}
              target={it.href.startsWith('http') ? '_blank' : undefined}
              rel={it.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              onClick={it.href === '#contact' ? onClose : undefined}
              className="flex flex-col items-start gap-2 p-3.5 rounded-2xl transition-opacity hover:opacity-90"
              style={{
                backgroundColor: it.primary
                  ? 'var(--color-fg)'
                  : 'color-mix(in srgb, var(--color-fg) 6%, transparent)',
                color: it.primary ? 'var(--color-bg)' : 'var(--color-fg)',
                border: it.primary ? 'none' : '1px solid var(--color-border)',
              }}
            >
              <span
                className="w-9 h-9 rounded-xl grid place-items-center"
                style={{
                  backgroundColor: it.primary
                    ? 'color-mix(in srgb, var(--color-bg) 15%, transparent)'
                    : 'var(--color-bg)',
                  border: it.primary ? 'none' : '1px solid var(--color-border)',
                }}
              >
                <it.icon size={16} />
              </span>
              <div>
                <p className="font-semibold text-[13px] sm:text-sm leading-tight">{it.label}</p>
                <p
                  className="text-[10px] sm:text-[11px] mt-0.5"
                  style={{ opacity: it.primary ? 0.7 : 0.6 }}
                >
                  {it.sub}
                </p>
              </div>
            </a>
          ))}
        </div>
        <CancelBtn onClose={onClose} />
      </div>
    </Sheet>
  );
}

/* ─────────────────────────  V4 — Quick Replies  ───────────────────────── */
function V4QuickReplies({ onClose }: { onClose: () => void }) {
  const replies = [
    'Narx so\'rash',
    'Bepul konsultatsiya',
    'Demo ko\'rsating',
    'Misol portfolio',
    'Boshlash',
  ];
  return (
    <Sheet onClose={onClose}>
      <div className="px-5 sm:px-6 pb-5 sm:pb-6">
        <h3 className="text-lg sm:text-xl font-bold text-center mb-1 mt-3">Tezkor xabar</h3>
        <p className="text-[12px] sm:text-sm text-muted text-center mb-5">
          Bittasini bosing — Telegram'da xabar tayyorlangan holda ochiladi
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {replies.map((r) => (
            <a
              key={r}
              href={`${TG}?text=${encodeURIComponent(r)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[12px] sm:text-sm font-semibold transition-opacity hover:opacity-90"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--color-fg) 8%, transparent)',
                color: 'var(--color-fg)',
                border: '1px solid var(--color-border)',
              }}
            >
              <MessageCircle size={13} className="opacity-70" />
              {r}
            </a>
          ))}
        </div>
        <a
          href={TG}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl mt-4 transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
        >
          <Send size={14} />
          <span className="font-semibold text-[13px] sm:text-sm">Yoki bo'sh xabar yozing</span>
        </a>
        <CancelBtn onClose={onClose} />
      </div>
    </Sheet>
  );
}

/* ─────────────────────────  V5 — Service Context  ───────────────────────── */
function V5ServiceContext({ onClose }: { onClose: () => void }) {
  return (
    <Sheet onClose={onClose}>
      <div className="px-5 sm:px-6 pb-5 sm:pb-6">
        <p className="text-[11px] sm:text-xs text-muted text-center mt-3 uppercase tracking-wider">
          Hozir ko'rayotgan xizmat
        </p>
        <div
          className="mt-3 rounded-2xl p-4 flex items-center gap-3"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-fg) 6%, transparent)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div
            className="shrink-0 w-12 h-12 rounded-xl grid place-items-center"
            style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
          >
            <RefreshCw size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-[14px] sm:text-base leading-tight">Sayt redesign</p>
            <p className="text-[11px] sm:text-xs text-muted mt-0.5">7–14 ish kunida tayyor</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[10px] uppercase text-muted">narxi</p>
            <p className="text-base sm:text-lg font-bold leading-none">$500</p>
            <p className="text-[10px] text-muted">dan</p>
          </div>
        </div>
        <p className="text-[12px] sm:text-sm text-muted text-center mt-4 leading-relaxed">
          Bu xizmat uchun bepul konsultatsiya — 1 ish kuni ichida javob
        </p>
        <a
          href={TG}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl mt-4 transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
        >
          <Send size={16} />
          <span className="font-semibold text-[13px] sm:text-sm">Buyurtma berish</span>
        </a>
        <CancelBtn onClose={onClose} />
      </div>
    </Sheet>
  );
}

/* ─────────────────────────  V6 — Trust Signals  ───────────────────────── */
function V6Trust({ onClose }: { onClose: () => void }) {
  const stats = [
    { value: '1 kun', label: 'Javob' },
    { value: '3 til', label: 'uz/ru/en' },
    { value: '100%', label: 'Shaffof' },
  ];
  return (
    <Sheet onClose={onClose}>
      <div className="px-5 sm:px-6 pb-5 sm:pb-6">
        <h3 className="text-lg sm:text-xl font-bold text-center mb-1 mt-3">Bog'lanish</h3>
        <p className="text-[12px] sm:text-sm text-muted text-center mb-5">
          Bepul konsultatsiya — narx va muddat aniq belgilanadi
        </p>
        <div className="grid grid-cols-3 gap-2 mb-5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="text-center rounded-xl py-3 px-1"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--color-fg) 6%, transparent)',
                border: '1px solid var(--color-border)',
              }}
            >
              <p className="text-sm sm:text-base font-bold leading-tight">{s.value}</p>
              <p className="text-[10px] sm:text-[11px] text-muted mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
        <a
          href={TG}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
        >
          <span className="flex items-center gap-3">
            <Send size={16} />
            <span className="font-semibold text-[13px] sm:text-sm">Telegram orqali yozish</span>
          </span>
          <ChevronRight size={16} />
        </a>
        <CancelBtn onClose={onClose} />
      </div>
    </Sheet>
  );
}

/* ─────────────────────────  V7 — Mini Form  ───────────────────────── */
function V7MiniForm({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => onClose(), 1400);
  };

  return (
    <Sheet onClose={onClose}>
      <div className="px-5 sm:px-6 pb-5 sm:pb-6">
        {!submitted ? (
          <>
            <h3 className="text-lg sm:text-xl font-bold text-center mb-1 mt-3">
              Telefoningizni qoldiring
            </h3>
            <p className="text-[12px] sm:text-sm text-muted text-center mb-5">
              1 ish kuni ichida o'zimiz qo'ng'iroq qilamiz
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
              <input
                required
                type="text"
                placeholder="Ismingiz"
                className="px-4 py-3 rounded-xl text-[13px] sm:text-sm outline-none focus:opacity-100"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-fg) 6%, transparent)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-fg)',
                }}
              />
              <input
                required
                type="tel"
                placeholder="+998 __ ___ __ __"
                className="px-4 py-3 rounded-xl text-[13px] sm:text-sm outline-none"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-fg) 6%, transparent)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-fg)',
                }}
              />
              <button
                type="submit"
                className="px-4 py-3.5 rounded-2xl transition-opacity hover:opacity-90 font-semibold text-[13px] sm:text-sm flex items-center justify-center gap-2"
                style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
              >
                Yuborish
                <ArrowRight size={15} />
              </button>
            </form>
            <div className="flex items-center gap-3 my-3">
              <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
              <span className="text-[10px] sm:text-[11px] text-muted">yoki</span>
              <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
            </div>
            <a
              href={TG}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-[13px] sm:text-sm font-semibold"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--color-fg) 6%, transparent)',
                border: '1px solid var(--color-border)',
              }}
            >
              <Send size={14} />
              Telegram'da yozish
            </a>
            <CancelBtn onClose={onClose} />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3 py-8"
          >
            <div
              className="w-14 h-14 rounded-full grid place-items-center"
              style={{ backgroundColor: '#22c55e', color: 'white' }}
            >
              <CheckCircle2 size={28} />
            </div>
            <p className="font-bold text-base sm:text-lg">Qabul qilindi</p>
            <p className="text-[12px] sm:text-sm text-muted text-center">
              1 ish kuni ichida bog'lanamiz
            </p>
          </motion.div>
        )}
      </div>
    </Sheet>
  );
}

/* ─────────────────────────  V8 — Tabs  ───────────────────────── */
function V8Tabs({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<'phone' | 'tg' | 'email'>('phone');
  const tabs = [
    { id: 'phone' as const, label: 'Qo\'ng\'iroq', icon: Phone },
    { id: 'tg' as const, label: 'Telegram', icon: Send },
    { id: 'email' as const, label: 'Email', icon: Mail },
  ];

  const content: Record<typeof tab, { title: string; sub: string; primary: string; href: string }> = {
    phone: {
      title: siteConfig.contact.phone,
      sub: 'Ish vaqti: 09:00–20:00 (dush–shanba)',
      primary: 'Qo\'ng\'iroq qilish',
      href: PHONE,
    },
    tg: {
      title: '@katovuz_bot',
      sub: 'Telegram\'da bizga yozing — bir necha daqiqada javob beramiz',
      primary: 'Telegram\'da ochish',
      href: TG_BOT,
    },
    email: {
      title: siteConfig.contact.email,
      sub: 'Batafsil ma\'lumot uchun — email orqali yozing',
      primary: 'Email yozish',
      href: EMAIL,
    },
  };

  const c = content[tab];

  return (
    <Sheet onClose={onClose}>
      <div className="px-5 sm:px-6 pb-5 sm:pb-6">
        <div
          className="grid grid-cols-3 p-1 rounded-2xl mt-3 mb-4"
          style={{ backgroundColor: 'color-mix(in srgb, var(--color-fg) 6%, transparent)' }}
        >
          {tabs.map((t) => {
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="relative flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] sm:text-[13px] font-semibold transition-colors"
                style={{
                  color: isActive ? 'var(--color-bg)' : 'var(--color-fg)',
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-xl"
                    style={{ backgroundColor: 'var(--color-fg)' }}
                    transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                  />
                )}
                <t.icon size={13} className="relative" />
                <span className="relative">{t.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <p className="text-base sm:text-lg font-bold text-center">{c.title}</p>
            <p className="text-[12px] sm:text-sm text-muted text-center mt-1 mb-4">{c.sub}</p>
            <a
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
            >
              <span className="font-semibold text-[13px] sm:text-sm">{c.primary}</span>
              <ArrowRight size={15} />
            </a>
          </motion.div>
        </AnimatePresence>
        <CancelBtn onClose={onClose} />
      </div>
    </Sheet>
  );
}

/* ─────────────────────────  V9 — Big CTA  ───────────────────────── */
function V9BigCTA({ onClose }: { onClose: () => void }) {
  return (
    <Sheet onClose={onClose}>
      <div className="px-5 sm:px-6 pb-5 sm:pb-6">
        <div className="text-center mt-4 mb-6">
          <h3 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight">
            Loyihangizni<br />boshlaylik
          </h3>
          <p className="text-[12px] sm:text-sm text-muted mt-3 max-w-xs mx-auto leading-relaxed">
            Telegram'da bir xabar — 1 ish kuni ichida narx va muddat aniq belgilanadi
          </p>
        </div>
        <a
          href={TG}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 px-5 py-5 rounded-2xl transition-opacity hover:opacity-90 group"
          style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
        >
          <Send size={20} />
          <span className="font-bold text-base sm:text-lg">Telegram orqali yozish</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowRight size={20} />
          </motion.span>
        </a>
        <CancelBtn onClose={onClose} />
      </div>
    </Sheet>
  );
}

/* ─────────────────────────  V10 — Animated Hero  ───────────────────────── */
function V10AnimatedHero({ onClose }: { onClose: () => void }) {
  return (
    <Sheet onClose={onClose}>
      <div className="relative h-28 sm:h-32 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 100%, color-mix(in srgb, var(--color-fg) 12%, transparent), transparent 70%)`,
          }}
        />
        {/* Floating message bubbles */}
        {[
          { left: '15%', delay: 0, size: 28 },
          { left: '35%', delay: 0.4, size: 22 },
          { left: '60%', delay: 0.2, size: 32 },
          { left: '80%', delay: 0.6, size: 24 },
        ].map((b, i) => (
          <motion.div
            key={i}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: -30, opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: b.delay,
              ease: 'easeOut',
            }}
            className="absolute bottom-0 rounded-2xl rounded-bl-md grid place-items-center"
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              backgroundColor: 'color-mix(in srgb, var(--color-fg) 18%, transparent)',
              border: '1px solid var(--color-border)',
            }}
          >
            <Send size={b.size * 0.4} className="opacity-70" />
          </motion.div>
        ))}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div
            className="w-12 h-12 rounded-2xl grid place-items-center font-bold text-lg shadow-2xl"
            style={{
              backgroundColor: 'var(--color-fg)',
              color: 'var(--color-bg)',
              fontFamily: 'var(--font-poppins), sans-serif',
              letterSpacing: '-0.05em',
            }}
          >
            K
          </div>
        </div>
      </div>

      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-4">
        <h3 className="text-lg sm:text-xl font-bold text-center mb-1">Yoz, javob beramiz</h3>
        <p className="text-[12px] sm:text-sm text-muted text-center mb-5">
          Loyihangiz haqida qisqacha yozing — 1 ish kuni ichida konkret taklif
        </p>
        <a
          href={TG}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
        >
          <Send size={16} />
          <span className="font-semibold text-[13px] sm:text-sm">Telegram orqali yozish</span>
        </a>
        <CancelBtn onClose={onClose} />
      </div>
    </Sheet>
  );
}

/* ─────────────────────────  Portal + Page  ───────────────────────── */
function NotificationPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}

export default function TestPage() {
  const [active, setActive] = useState<VariantId | null>(null);

  useEffect(() => {
    const prev = document.body.style.overflowY;
    document.body.style.overflowY = 'auto';
    return () => { document.body.style.overflowY = prev; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const renderActive = () => {
    if (active === null) return null;
    const onClose = () => setActive(null);
    switch (active) {
      case 1: return <V1Minimal key="v1" onClose={onClose} />;
      case 2: return <V2AvatarHero key="v2" onClose={onClose} />;
      case 3: return <V3Grid key="v3" onClose={onClose} />;
      case 4: return <V4QuickReplies key="v4" onClose={onClose} />;
      case 5: return <V5ServiceContext key="v5" onClose={onClose} />;
      case 6: return <V6Trust key="v6" onClose={onClose} />;
      case 7: return <V7MiniForm key="v7" onClose={onClose} />;
      case 8: return <V8Tabs key="v8" onClose={onClose} />;
      case 9: return <V9BigCTA key="v9" onClose={onClose} />;
      case 10: return <V10AnimatedHero key="v10" onClose={onClose} />;
    }
  };

  return (
    <>
      <main className="container-custom max-w-5xl pt-24 sm:pt-32 pb-32">
        <div className="mb-8 sm:mb-12">
          <span
            className="inline-block text-[11px] sm:text-xs font-medium px-3 py-1 rounded-full mb-3 sm:mb-4"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-fg) 8%, transparent)',
              border: '1px solid var(--color-border)',
            }}
          >
            Test sahifa · v3 · faqat ichki
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 tracking-tight text-balance">
            10 ta bottom sheet varianti
          </h1>
          <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
            Hammasi pastdan sliding sheet uslubida (yoqgan #3 asosida). Layout va kontent har xil:
            minimal, avatar bilan, grid, quick replies, service context, trust, form, tabs, big CTA,
            animatsion. Mobile uchun home indicator chizig'idan tepada.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {VARIANTS.map((v) => {
            const isActive = active === v.id;
            return (
              <motion.button
                key={v.id}
                onClick={() => setActive(isActive ? null : v.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="text-left rounded-2xl p-4 sm:p-5 transition-all relative overflow-hidden"
                style={{
                  backgroundColor: isActive
                    ? 'color-mix(in srgb, var(--color-fg) 10%, transparent)'
                    : 'var(--color-bg)',
                  border: `1px solid ${isActive ? 'var(--color-fg)' : 'var(--color-border)'}`,
                }}
              >
                <div className="flex items-start justify-between gap-3 mb-2 sm:mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-[11px] sm:text-xs font-bold"
                      style={{
                        backgroundColor: isActive
                          ? 'var(--color-fg)'
                          : 'color-mix(in srgb, var(--color-fg) 10%, transparent)',
                        color: isActive ? 'var(--color-bg)' : 'var(--color-fg)',
                      }}
                    >
                      {v.id}
                    </span>
                    <span
                      className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--color-fg) 6%, transparent)',
                        color: 'var(--color-muted)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      {v.tag}
                    </span>
                  </div>
                  {isActive && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: 'var(--color-fg)', color: 'var(--color-bg)' }}
                    >
                      Faol
                    </motion.span>
                  )}
                </div>
                <h3 className="text-[15px] sm:text-base font-semibold mb-1">{v.name}</h3>
                <p className="text-[12px] sm:text-sm text-muted leading-relaxed">{v.desc}</p>
              </motion.button>
            );
          })}
        </div>

        <div
          className="mt-10 sm:mt-12 rounded-2xl p-4 sm:p-5"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-fg) 4%, transparent)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div className="flex items-start gap-3">
            <Sparkles size={16} className="opacity-70 shrink-0 mt-0.5" />
            <p className="text-[12px] sm:text-sm text-muted leading-relaxed">
              Hammasi v3 uslubida (yoqgan): backdrop blur + sliding sheet + drag handle + safe area inset.
              Yopish: backdrop'ni bosing, Esc tugmasi yoki "Yopish".
            </p>
          </div>
        </div>
      </main>

      <NotificationPortal>
        <AnimatePresence mode="wait">{renderActive()}</AnimatePresence>
      </NotificationPortal>
    </>
  );
}
