import { StartClient } from "@tanstack/react-start/client";
import { StrictMode, startTransition } from "react";
import { createRoot } from "react-dom/client";

startTransition(() => {
  createRoot(document.body).render(
    <StrictMode>
      <StartClient />
    </StrictMode>
  );
});
