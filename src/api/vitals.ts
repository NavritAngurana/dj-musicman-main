const BASE_URL = "http://10.0.2.15:5050";


export async function startScan() {
  const res = await fetch(`${BASE_URL}/start`, {
    method: "POST",
  });
  return res.json();
}

export async function stopScan() {
  const res = await fetch(`${BASE_URL}/stop`, {
    method: "POST",
  });
  return res.json();
}

export async function getMetrics() {
  const res = await fetch(`${BASE_URL}/metrics`);
  return res.json();
}
