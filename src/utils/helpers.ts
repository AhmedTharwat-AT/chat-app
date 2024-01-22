export function formatTime(timestamp: number | string) {
  const time = new Date(+timestamp);
  return time.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
