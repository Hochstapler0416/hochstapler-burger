import { useEffect, useRef } from "react";

interface ResmioWidgetProps {
  facilityId: string;
  height?: string;
}

export function ResmioWidget({ facilityId, height = "600px" }: ResmioWidgetProps) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const existingScript = document.querySelector(`script[data-resmio="${facilityId}"]`);
    if (existingScript) return;

    const script = document.createElement("script");
    script.setAttribute("data-resmio", facilityId);
    script.src = `//static.resmio.com/static/de/widget.js#id=${facilityId}&width=100%25&height=${encodeURIComponent(height)}`;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      initialized.current = false;
    };
  }, [facilityId, height]);

  return (
    <div id={`resmio-${facilityId}`} className="w-full min-h-[580px]" />
  );
}
