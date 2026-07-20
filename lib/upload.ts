export async function fileToString(
  file: File
) {
  const buffer = await file.arrayBuffer();

  return Buffer.from(buffer).toString(
    "utf8"
  );
}