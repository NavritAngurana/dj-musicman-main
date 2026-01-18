// src/lib/audioHelpers.ts
import { audioLibrary, Folder, Track } from "./audioLibrary";

export function findBestTrackMatch(
  bpm: number,
  folderName: string
): Track | null {
  const folder = audioLibrary.find((f) => f.name === folderName);
  if (!folder) return null;

  const tracksWithBpm = folder.tracks.filter(
    (t) => typeof t.bpm === "number"
  );

  if (tracksWithBpm.length === 0) return null;

  let bestTrack = tracksWithBpm[0];
  let bestDiff = Math.abs(bpm - bestTrack.bpm!);

  for (let i = 1; i < tracksWithBpm.length; i++) {
    const track = tracksWithBpm[i];
    const diff = Math.abs(bpm - track.bpm!);

    if (diff < bestDiff) {
      bestDiff = diff;
      bestTrack = track;
    }
  }

  return bestTrack;
}


/*
Example Usage

#import command
import { findBestTrackMatch } from "@/lib/audioHelpers";

#inputs (we are using local so "LocalTest" and bpm(get from presage))
const bpm = 98;
const folder = "Youtube";

#Method call / return
const bestTrack = findBestTrackMatch(bpm, folder);

console.log(bestTrack);
*/