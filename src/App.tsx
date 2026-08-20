import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ChatWidget from "./components/ChatWidget";

const queryClient = new QueryClient();

/* =========================================================
   CURSOR LIGHT
   ========================================================= */

function CursorLight() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Cursor effect is mainly for desktop devices.
    // On touch/mobile devices there is no mouse cursor.
    const handleMouseMove = (e: MouseEvent) => {
      setPos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="cursor-light"
      aria-hidden="true"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }}
    />
  );
}


/* =========================================================
   APP
   ========================================================= */

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>

        {/* Desktop cursor glow */}
        <CursorLight />

        {/* Main application */}
        <main className="w-full min-w-0 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Floating Chat Widget */}
        <ChatWidget />

      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;