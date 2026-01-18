// CHANGE THIS to your Ubuntu VM IP
const BASE = "http://10.0.2.15:5050"; // example

export async function startVitals() {
  const r = await fetch(`${BASE}/start`, { method: "POST" });
  return r.json();
}

export async function stopVitals() {
  const r = await fetch(`${BASE}/stop`, { method: "POST" });
  return r.json();
}

export async function getVitals() {
  const r = await fetch(`${BASE}/metrics`);
  return r.json();
}
