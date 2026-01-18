import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
//import { currentActivity } from "@/components/dj-session/ActivitySelector"

const images = [
  "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",

];

const imagesGaming = [
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop",
];


const imagesFun = [
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
];

const imageMap: Record<string, string[]> = {
  study: images,
  gaming: imagesGaming,
  fun: imagesFun,
};

const ImageCarousel = ({ activity }: { activity: string }) => {
  const activeImages = imageMap[activity] ?? images;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [activity]);
  

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeImages.length);
    setIsAutoPlaying(false);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Main Carousel Container */}
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm border border-border/30 shadow-neon">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={activeImages[currentIndex]}
            alt={`Visualization ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/30 backdrop-blur-sm hover:bg-background/50 border border-border/30"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/30 backdrop-blur-sm hover:bg-background/50 border border-border/30"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {activeImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-primary w-6"
                  : "bg-foreground/30 hover:bg-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
