import { Suspense } from "react";
import MenuContent from "../components/MenuContent";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F5F0EB] flex items-center justify-center">
          <div className="text-[#722F37] text-xl font-semibold">Florya</div>
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}