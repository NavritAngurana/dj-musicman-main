import { useState, useEffect } from "react";

interface SessionClockProps {
  sessionStartTime: number;
}

const SessionClock = ({ sessionStartTime }: SessionClockProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setElapsed(Math.floor((Date.now() - sessionStartTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [sessionStartTime]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatElapsed = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center">
      <span className="text-7xl md:text-8xl font-bold text-gradient tracking-tight">
        {formatTime(currentTime)}
      </span>
      <span className="text-sm text-muted-foreground mt-2">
        Session: {formatElapsed(elapsed)}
      </span>
    </div>
  );
};

export default SessionClock;
