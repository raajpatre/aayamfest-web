export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(value?: string) {
  if (!value) {
    return "Prize pool updating";
  }
  return value;
}

export function formatCountdown(targetDate?: string) {
  if (!targetDate) {
    return null;
  }

  const total = new Date(targetDate).getTime() - Date.now();

  if (Number.isNaN(total) || total <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  const seconds = Math.floor(total / 1000);

  return {
    days: Math.floor(seconds / (60 * 60 * 24)),
    hours: Math.floor((seconds % (60 * 60 * 24)) / (60 * 60)),
    minutes: Math.floor((seconds % (60 * 60)) / 60),
    seconds: seconds % 60
  };
}
