"use client";

import { useRef, useEffect } from "react";

const useTradeViewWIdget = (
  scriptUrl: string,
  config: Record<string, unknown>,
  height = 600
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check if already loaded
    if (containerRef.current.dataset.loaded) return;

    // Clear container
    containerRef.current.innerHTML = "";

    // Create the widget container div
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "tradingview-widget-container__widget";
    widgetContainer.style.width = "100%";
    widgetContainer.style.height = `${height}px`;
    containerRef.current.appendChild(widgetContainer);

    // Create and configure script
    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.type = "text/javascript";

    // Set the config as text content, not innerHTML
    script.textContent = JSON.stringify(config);

    // Append script
    containerRef.current.appendChild(script);

    // Mark as loaded
    containerRef.current.dataset.loaded = "true";

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        delete containerRef.current.dataset.loaded;
      }
    };
  }, [scriptUrl, config, height]);

  return containerRef;
};

export default useTradeViewWIdget;
