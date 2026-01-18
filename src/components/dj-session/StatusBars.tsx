import heartIcon from "@/assets/heart.png";
import hungerIcon from "@/assets/hunger.png";
import { motion } from "framer-motion";

interface StatusBarsProps {
  hearts: number;
  maxHearts: number;
  hunger: number;
  maxHunger: number;
  activity: string;
}

const randomNumber = Math.floor(Math.random() * 100);
const StatusBars = ({ hearts, maxHearts, hunger, maxHunger, activity }: StatusBarsProps) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      {/*Change based on study or gaming */}
      {activity === "study" && (
  <div className="flex justify-center gap-4 text-center text-muted-foreground">
    <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              //whileHover={{ scale: 1.02, y: -5 }}
              className="group relative rounded-2xl border border-border bg-card px-6 py-3 m-2 shadow-card hover:border-primary/50 transition-all duration-300"
            >
      <div className="flex flex items-baseline gap-2">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          Heart Rate
          </span>
        <div className="text-lg font-semibold text-gradient tracking-tight">
            <p>{randomNumber}</p>
        </div>
      </div>
    </motion.div>

    <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative rounded-2xl border border-border bg-card px-6 py-3 m-2 shadow-card hover:border-primary/50 transition-all duration-300"
            >
      <div className="flex items-baseline gap-2">
  <span className="text-xs text-muted-foreground uppercase tracking-wide">
    Mood :3
  </span>
  <p className="text-lg font-semibold text-gradient tracking-tight">nonchalant</p>
</div>
    </motion.div>
  </div>
)}
{activity === "gaming" && (
  <div className="text-center text-red-400">
    🎮 Game mode activated
  </div>
)}

{activity === "fun" && (
  <div className="text-center text-pink-400">
    {/* Hunger Bar */}
    <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground uppercase tracking-wide w-16">Heart Rate</span>
        <div className="flex gap-1">
          {Array.from({ length: maxHunger }).map((_, index) => (
            <img
              key={`hunger-${index}`}
              src={hungerIcon}
              alt="Hunger"
              className={`w-6 h-6 transition-all ${
                index < hunger ? "opacity-100" : "opacity-20 grayscale"
              }`}
              style={{ imageRendering: "pixelated" }}
            />
          ))}
        </div>
      </div>

      {/* Hearts Bar */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground uppercase tracking-wide w-16">Current Vibe</span>
        <div className="flex gap-1">
          {Array.from({ length: maxHearts }).map((_, index) => (
            <img
              key={`heart-${index}`}
              src={heartIcon}
              alt="Heart"
              className={`w-6 h-6 transition-all ${
                index < hearts ? "opacity-100" : "opacity-20 grayscale"
              }`}
              style={{ imageRendering: "pixelated" }}
            />
          ))}
        </div>
      </div>
  </div>
)}
      
    </div>
  );
};

export default StatusBars;
