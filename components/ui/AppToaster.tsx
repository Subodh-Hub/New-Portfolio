"use client";

import { Toaster } from "react-hot-toast";

export function AppToaster() {
  return (
    <Toaster
      position="top-center"
      containerStyle={{ zIndex: 20000 }}
      toastOptions={{
        duration: 4000,
        style: {
          zIndex: 20000,
          borderRadius: "12px",
          background: "#111",
          color: "#fff",
          fontSize: "0.9rem",
          padding: "12px 16px",
          border: "1px solid #333",
          maxWidth: "420px",
        },
        success: {
          iconTheme: { primary: "#d2ff00", secondary: "#111" },
        },
        error: {
          iconTheme: { primary: "#f87171", secondary: "#111" },
        },
      }}
    />
  );
}
