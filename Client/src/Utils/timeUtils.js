export const formatDuration = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let dateStr = "";

  days && (dateStr += `${days}d `);
  hours && (dateStr += `${hours % 24}h `);
  minutes && (dateStr += `${minutes % 60}m `);
  seconds && (dateStr += `${seconds % 60}s `);

  dateStr === "" && (dateStr = "0s");

  return dateStr;
};

export const formatDurationRounded = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let time = "";
  if (days > 0) {
    time += `${days} day${days !== 1 ? "s" : ""}`;
    return time;
  }
  if (hours > 0) {
    time += `${hours} hour${hours !== 1 ? "s" : ""}`;
    return time;
  }
  if (minutes > 0) {
    time += `${minutes} minute${minutes !== 1 ? "s" : ""}`;
    return time;
  }
  if (seconds > 0) {
    time += `${seconds} second${seconds !== 1 ? "s" : ""}`;
    return time;
  }

  return time;
};

export const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  // Return the date using the specified options
  return date.toLocaleString("en-US", options);
};
