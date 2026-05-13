import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import "./product-card.css";

interface ProductCardProps {
  title: string;
  description: string;
  slug: string;
  image: string;
  price?: string;
  features?: string[];
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  slug,
  image,
  price,
  features,
}) => {
  const [currentImage, setCurrentImage] = React.useState(image);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const generateImage = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-product-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.imageUrl) {
          setCurrentImage(data.imageUrl);
        }
      } else {
        const err = await response.json();
        console.error("Failed:", err.error);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="product-card h-full flex flex-col">
      {/* IMAGE */}
      <div className="product-card-image relative mb-6">
        <img
          src={currentImage}
          alt={title}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        
        {price && (
          <div className="absolute top-4 right-4 px-4 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-neon-cyan font-bold text-sm">
            {price}
          </div>
        )}

        <button 
          onClick={generateImage}
          disabled={isGenerating}
          className="absolute bottom-4 right-4 p-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-white hover:text-cyan-400 disabled:opacity-50 transition-colors"
          title="Generate Unique AI Visual"
        >
          {isGenerating ? (
            <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg>
          )}
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1">
        <h3 className="product-card-title">
          {title}
        </h3>

        <p className="product-card-desc">
          {description}
        </p>

        {features && Array.isArray(features) && features.length > 0 && (
          <div className="space-y-2 mb-6 flex-1">
            {features.slice(0, 3).map((feature, i) => (
              <div key={i} className="flex items-center text-[10px] text-white/40 uppercase tracking-widest">
                <div className="w-1 h-1 bg-neon-cyan rounded-full mr-2 shadow-[0_0_5px_rgba(0,255,255,0.8)]" />
                {feature}
              </div>
            ))}
          </div>
        )}

        {/* BUTTON */}
        <Link
          to={`/pricing/${slug}`}
          className="product-card-button"
        >
          Explore Tier
        </Link>
      </div>
    </div>
  );
};
