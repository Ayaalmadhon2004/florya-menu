"use client";

import Image from "next/image";

interface QRModalProps {
  url: string;
  onClose: () => void;
}

export default function QRModal({ url, onClose }: QRModalProps) {
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(url)}`;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-title"
    >
      <div
        className="bg-white rounded-2xl p-6 max-w-xs w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="qr-title" className="text-lg font-semibold text-text-primary mb-1">
          Share Menu
        </h3>
        <p className="text-xs text-text-secondary mb-4">
          Scan to open on your phone
        </p>
        <Image
          src={qrSrc}
          alt="QR Code for menu sharing"
          width={192}
          height={192}
          className="mx-auto mb-4"
          unoptimized
        />
        <p className="text-[10px] text-text-muted break-all mb-4">{url}</p>
        <button
          onClick={onClose}
          aria-label="Close QR modal"
          className="w-full py-2.5 rounded-lg bg-burgundy text-white text-sm font-medium hover:bg-burgundy-dark transition min-h-[48px]"
        >
          Close
        </button>
      </div>
    </div>
  );
}