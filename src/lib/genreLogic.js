export function decideGenre({ avgPulse, avgBreath, valid }) {
  if (!valid) return null; // don’t change genre if data isn’t valid

  // Very simple hackathon thresholds (tune later)
  const p = Number(avgPulse);
  const b = Number(avgBreath);

  // Calm / down-regulate
  if (p >= 95 || b >= 18) return "calm";        // lofi / ambient
  // Energetic / up-regulate
  if (p <= 70 && b <= 14) return "fun";         // pop / upbeat
  // Middle = keep current
  return "steady";                               // keep playing
}
