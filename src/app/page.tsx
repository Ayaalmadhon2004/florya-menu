import { Suspense } from "react";
import MenuApp from "../components/MenuApp";

export default function Home() {
  return (
    <Suspense fallback={<div className="grid min-h-screen place-items-center bg-burgundy text-2xl font-semibold text-white">…</div>}>
      <MenuApp />
    </Suspense>
  );
}
