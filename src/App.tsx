import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ChatWidget from "./components/ChatWidget";

const queryClient = new QueryClient();

/* 🔥 Cursor Light Component */
function CursorLight() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="cursor-light"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }}
    />
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>

      {/* 🔥 ADD THIS LINE */}
      <CursorLight />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ChatWidget />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;