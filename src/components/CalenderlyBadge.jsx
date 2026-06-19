import { useEffect } from "react";

export default function CalendlyBadge() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src =
      "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;

    script.onload = () => {
      if (window.Calendly) {
        window.Calendly.initBadgeWidget({
          url: "https://calendly.com/oceantidedrop/new-meeting",
          text: "🌊 Book Your Free AI Wave Session",
          color: "#101319",
          textColor: "#13dadf",
          branding: true,
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return null;
}