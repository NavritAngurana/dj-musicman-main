import heartIcon from "@/assets/heart.png";

const MoodLegend = () => {
  return (
    <div className="flex flex-col gap-2 bg-card/50 backdrop-blur-sm rounded-lg p-3 border border-border/30">
      <div className="flex items-center gap-2">
        <img 
          src={heartIcon} 
          alt="Happy heart" 
          className="w-5 h-5" 
          style={{ imageRendering: "pixelated" }}
        />
        <span className="text-sm text-foreground">= Happy</span>
      </div>
      <div className="flex items-center gap-2">
        <img 
          src={heartIcon} 
          alt="Angry heart" 
          className="w-5 h-5 grayscale opacity-50" 
          style={{ imageRendering: "pixelated" }}
        />
        <span className="text-sm text-foreground">= Angry</span>
      </div>
    </div>
  );
};

export default MoodLegend;
