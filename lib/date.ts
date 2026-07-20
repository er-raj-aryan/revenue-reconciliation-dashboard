export function parseCSVDate(
  value: string
): Date {
  if (!value || value.trim() === "") {
    throw new Error("Empty date");
  }

  const cleaned = value.trim();

  // Format:
  // 03/05/2025 16:24

  const [datePart, timePart] =
    cleaned.split(" ");

  const [day, month, year] =
    datePart.split("/").map(Number);

  const [hour, minute] =
    timePart.split(":").map(Number);

  return new Date(
    year,
    month - 1,
    day,
    hour,
    minute
  );
}