"use client";

import { useEffect, useState } from "react";

interface QRModalProps {
  url: string;
  onClose: () => void;
}

export default function QRModal({ url, onClose }: QRModalProps) {
  const [qrSrc, setQrSrc] = useState("");

  useEffect(() => {
    setQrSrc(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(url)}`);
  }, [url]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-xs w-full text-center" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-text-primary mb-1">Share Menu</h3>
        <p className="text-xs text-text-secondary mb-4">Scan to open on your phone</p>
        {qrSrc && (
          <img src={qrSrc} alt="QR Code" className="w-48 h-48 mx-auto mb-4" />
        )}
        <p className="text-[10px] text-text-muted break-all mb-4">{url}</p>
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-lg bg-burgundy text-white text-sm font-medium hover:bg-burgundy-dark transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
