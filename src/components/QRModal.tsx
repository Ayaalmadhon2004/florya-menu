"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import type { UiKey } from "../lib/i18n";

export default function QRModal({ url, t, onClose }: { url: string; t: (k: UiKey) => string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); } catch {}
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="qr-title">
      <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 24 }} className="w-full max-w-xs rounded-2xl bg-white p-6 text-center" onClick={(e) => e.stopPropagation()}>
        <h3 id="qr-title" className="text-lg font-semibold">{t("share")}</h3>
        <p className="mb-4 text-xs text-text-secondary">{t("scanToOpen")}</p>
        <QRCodeSVG value={url} size={192} className="mx-auto mb-4" marginSize={2} />
        <button onClick={copy} className="mb-2 min-h-11 w-full rounded-xl border border-burgundy text-sm font-semibold text-burgundy">
          {copied ? t("copied") : t("copyLink")}
        </button>
        <button onClick={onClose} className="min-h-11 w-full rounded-xl bg-burgundy text-sm font-medium text-white">{t("close")}</button>
      </motion.div>
    </motion.div>
  );
}
