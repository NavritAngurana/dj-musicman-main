import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";



interface Song {
  title: string;
  artist: string;
  album: string;
  duration: number;
  artwork: string;
  currentTime: number;
}

interface NowPlayingBarProps {
  song: Song;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const NowPlayingBar = ({ 
  song,
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrev,
}: NowPlayingBarProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = (song.currentTime / song.duration) * 100;

  return (
    <div className="w-full bg-card/80 backdrop-blur-xl border border-border/30 rounded-2xl p-4 shadow-card">
      <div className="flex items-center gap-4">
        {/* Album Art */}
        {/* src={song.imageUrl} */}
        <motion.img
          src={song.artwork ?? "/images/default-cover.png"}
          alt={song.album}
          className="w-16 h-16 rounded-lg object-cover shadow-neon"
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{
            duration: 4,
            repeat: isPlaying ? Infinity : 0,
            ease: "linear",
          }}
        />

        {/* Song Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{song.title}</h3>
          <p className="text-sm text-muted-foreground truncate">{song.artist} • {song.album}</p>
          
          {/* Progress Bar */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-muted-foreground">{formatTime(song.currentTime)}</span>
            <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{formatTime(song.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onPrev}>
            <SkipBack className="h-4 w-4" />
          </Button>
       
          <Button
            variant="glow"
            size="icon"
            onClick={isPlaying ? onPause : onPlay}
            className="rounded-full"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          <Button variant="ghost" size="icon" onClick={onNext}>
            <SkipForward className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground ml-2">
            <Volume2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingBar;
