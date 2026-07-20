import { parse } from "csv-parse/sync";

export function parseCSV(text: string) {
  return parse(text, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
}