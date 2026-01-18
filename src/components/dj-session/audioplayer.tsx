"use client";

import { useEffect, useRef, useState } from "react";

export default function AudioPlayer({
  src,
  isPlaying,
  onProgress,
  onEnded,
}: {
  src: string;
  isPlaying: boolean;
  onProgress: (time: number, duration: number) => void;
  onEnded: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [src, isPlaying]);

  return (
    <audio
      ref={audioRef}
      src={src}
      onTimeUpdate={(e) => {
        const el = e.currentTarget;
        onProgress?.(el.currentTime, el.duration);
        }
      }
      onLoadedMetadata={(e) => {
        const el = e.currentTarget;
        onProgress?.(el.currentTime, el.duration);
    }}
      onEnded={onEnded}
    />
  );
}
