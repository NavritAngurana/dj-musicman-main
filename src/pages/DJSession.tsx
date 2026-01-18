import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SessionClock from "@/components/dj-session/SessionClock";
import ActivitySelector from "@/components/dj-session/ActivitySelector";
import ImageCarousel from "@/components/dj-session/ImageCarousel";
import NowPlayingBar from "@/components/dj-session/NowPlayingBar";

import  AudioPlayer from "@/components/dj-session/audioplayer"
import { audioLibrary, Folder, Track } from "@/lib/audioLibrary";
import { Console, time } from "console";
import { findBestTrackMatch } from "@/lib/audioHelpers";

type VitalsPayload = {
  ok?: boolean;
  running?: boolean;
  valid?: boolean;
  avgPulse?: number;
  avgBreath?: number;
  samples?: number;
  epochMs?: number;
  error?: string;
};

const BASE = "http://localhost:5050";




function decideGenre(v: VitalsPayload): "calm" | "fun" | "steady" | null {
  if (!v || v.valid !== true) return null;

  const p = Number(v.avgPulse ?? NaN);
  const b = Number(v.avgBreath ?? NaN);
  if (!Number.isFinite(p) || !Number.isFinite(b)) return null;

  // Hackathon thresholds (tune later)
  if (p >= 95 || b >= 18) return "calm";
  if (p <= 70 && b <= 14) return "fun";
  return "steady";
}

async function postJson(path: string) {
  const r = await fetch(`${BASE}${path}`, { method: "POST" });
  return r.json();
}
async function getJson(path: string) {
  const r = await fetch(`${BASE}${path}`);
  return r.json();
}

const DJSession = () => {
  const [sessionStartTime] = useState(Date.now());

  // Local music
  const folder = audioLibrary[0];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentTrack = folder.tracks[currentIndex];

  const [currentTime, setCurrentTime] = useState(0);
  const [lastCheck, setLastCheck] = useState(0);
  const [duration, setDuration] = useState(0);

  // Autoplay gating
  const [hasInteracted, setHasInteracted] = useState(false);

  // Activity
  const [activity, setActivity] = useState("study");

  // “Connected” UI toggles (OAuth later)
  const [spotifyConnected, setSpotifyConnected] = useState(false);
  const [appleConnected, setAppleConnected] = useState(false);
  const [ytConnected, setYtConnected] = useState(false);

  // DJ session + vitals
  const [djRunning, setDjRunning] = useState(false);
  const [vitals, setVitals] = useState<VitalsPayload | null>(null);
  const [lastEpoch, setLastEpoch] = useState<number | null>(null);
  const [currentGenre, setCurrentGenre] = useState<"steady" | "calm" | "fun">("steady");

  const pollRef = useRef<number | null>(null);

  function maybeChangeSong(targetBpm: number) {
    const nextTrack = findBestTrackMatch(targetBpm, "LocalTest");
    if (!nextTrack) return;

    if (nextTrack.id === currentTrack.id) return;

    const nextIndex = folder.tracks.findIndex(
      (t) => t.id === nextTrack.id


    );

    if (nextIndex === -1) return;

    setCurrentIndex(nextIndex);
    setIsPlaying(true);
}

  const startDJ = async () => {
    setHasInteracted(true); // allow autoplay
    setIsPlaying(true);     // start music immediately
    setDjRunning(true);

    try {
      await postJson("/start");
    } catch (e) {
      console.error("startVitals failed", e);
      // keep music going even if backend fails (hackathon-safe)
    }
  };

  const stopDJ = async () => {
    setDjRunning(false);
    setIsPlaying(false);

    try {
      await postJson("/stop");
    } catch (e) {
      console.error("stopVitals failed", e);
    }
  };

  useEffect(() => {
  if (!isPlaying) return;

  // Only trigger every 30s boundary
  const currentCheckpoint = Math.floor(currentTime / 30) * 30;

  if (currentCheckpoint !== lastCheck) {
    maybeChangeSong(vitals.avgPulse)
  }
}, [currentTime, isPlaying]);


  useEffect(() => {
    if (!djRunning) {
      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
      return;
    }

    pollRef.current = window.setInterval(async () => {
      try {
        const m: VitalsPayload = await getJson("/metrics");
        setVitals(m);

        // Only act when a new 30s summary arrives
        if (m?.epochMs && m.epochMs !== lastEpoch) {
          setLastEpoch(m.epochMs);

          const g = decideGenre(m);
          if (!g || g === "steady") return;

          if (g !== currentGenre) {
            setCurrentGenre(g);

            // Hackathon-simple: just skip to next track when genre changes.
            setCurrentIndex((i) => (i + 1) % folder.tracks.length);
          }
        }
      } catch (e) {
        console.error("metrics poll failed", e);
      }
    }, 2000);

    return () => {
      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [djRunning, lastEpoch, currentGenre, folder.tracks.length]);

  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects (IMPORTANT: pointer-events-none so they don't block clicks) */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px] animate-pulse-slow pointer-events-none" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none"
        style={{ animationDelay: "1.5s" }}
      />

      {/* IMPORTANT: relative z-10 keeps content above background layers */}
      <div className="container mx-auto px-3 lg:px-4 py-6 flex flex-col relative z-10">
        {/* Top Section: Clock */}
        <div className="flex justify-start lg:justify-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex flex-col items-center"
          >
            <SessionClock sessionStartTime={sessionStartTime} />
          </motion.div>
        </div>

        {/* Activity Selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-start lg:justify-center mb-6"
        >
          <ActivitySelector value={activity} onChange={setActivity} />
        </motion.div>

        {/* “Connect” buttons (UI-only for hackathon) */}
        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          <button
            onClick={() => setSpotifyConnected((v) => !v)}
            className={`px-4 py-2 rounded-full border transition ${
              spotifyConnected ? "bg-green-500/15 border-green-500" : "border-border"
            }`}
          >
            {spotifyConnected ? "Spotify Connected" : "Connect Spotify"}
          </button>

          <button
            onClick={() => setAppleConnected((v) => !v)}
            className={`px-4 py-2 rounded-full border transition ${
              appleConnected ? "bg-blue-500/15 border-blue-500" : "border-border"
            }`}
          >
            {appleConnected ? "Apple Music Connected" : "Connect Apple Music"}
          </button>

          <button
            onClick={() => setYtConnected((v) => !v)}
            className={`px-4 py-2 rounded-full border transition ${
              ytConnected ? "bg-red-500/15 border-red-500" : "border-border"
            }`}
          >
            {ytConnected ? "YouTube Music Connected" : "Connect YouTube Music"}
          </button>
        </div>

        {/* Start/Stop DJ + Mode pill */}
        <div className="flex justify-center gap-3 mb-6">
          {!djRunning ? (
            <button
              onClick={startDJ}
              className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold shadow-md hover:opacity-90 active:scale-[0.98] transition"
            >
              Start DJ
            </button>
          ) : (
            <button
              onClick={stopDJ}
              className="px-5 py-2 rounded-full bg-destructive text-destructive-foreground font-semibold shadow-md hover:opacity-90 active:scale-[0.98] transition"
            >
              Stop DJ
            </button>
          )}

          <div className="px-4 py-2 rounded-full border border-border text-sm flex items-center gap-2">
            <span className="opacity-70">Mode:</span>
            <span className="font-semibold">{currentGenre}</span>
          </div>
        </div>

        {/* Optional tiny vitals proof panel */}
        <div className="flex justify-center mb-6">
          <div className="px-4 py-2 rounded-2xl border border-border text-xs max-w-[520px] w-full">
            <div className="flex justify-between">
              <span className="opacity-70">Backend</span>
              <span className="font-semibold">
                {vitals?.running ? "running" : "idle"} / {vitals?.valid ? "valid" : "waiting"}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-border p-2">
                <div className="opacity-70">Avg Pulse</div>
                <div className="font-semibold">{vitals?.avgPulse?.toFixed?.(1) ?? "--"}</div>
              </div>
              <div className="rounded-xl border border-border p-2">
                <div className="opacity-70">Avg Breath</div>
                <div className="font-semibold">{vitals?.avgBreath?.toFixed?.(1) ?? "--"}</div>
              </div>
              <div className="rounded-xl border border-border p-2">
                <div className="opacity-70">Samples</div>
                <div className="font-semibold">{vitals?.samples ?? "--"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content: Image Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grow flex flex-col items-center justify-start lg:justify-center mb-8"
        >
          <ImageCarousel activity={activity} />
        </motion.div>

        {/* Audio */}
        <AudioPlayer
              src={currentTrack.src}
              isPlaying={isPlaying}
              onProgress={(time, duration) => {
                  setCurrentTime(time);
                  setDuration(duration || 0);
              }}

              onEnded={() => {
                setCurrentIndex((i) => (i + 1) % folder.tracks.length);
              }}
            />

         {/* Now Playing Bar */}
            <AudioPlayer
              src={currentTrack.src}
              isPlaying={isPlaying}
              onProgress={(time, duration) => {
                  setCurrentTime(time);
                  setDuration(duration || 0);
              }}

              onEnded={() => {
                setCurrentIndex((i) => (i + 1) % folder.tracks.length);
              }}
            />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <NowPlayingBar song={{
          title: currentTrack.title,
          artist: currentTrack.artist,
          album: currentTrack.album,
          duration: currentTrack.duration,
          artwork: currentTrack.artwork,
          currentTime: currentTime,
        }} 
          isPlaying={isPlaying}
          onPlay={()=>setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
       onNext={() => {
  const nextTrack = findBestTrackMatch(150, "LocalTest");
  if (!nextTrack) return;

  const nextIndex = folder.tracks.findIndex(
    (track) => track.id === nextTrack.id
  );

  if (nextIndex !== -1) {
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
  }
}}

          onPrev={() =>
            setCurrentIndex((i) =>
              i === 0 ? folder.tracks.length - 1 : i - 1
            )
          }
        />
        </motion.div>

        
      </div>
    </div>
  );
};



export default DJSession;
