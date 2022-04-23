export function parseHandle(str) {
  let parsed = "";
  if (str.includes("instagram.com/")) {
    parsed = str
      .split("instagram.com/")[1]
      .replace("\n", "")
      .replace("/", "")
      .trim()
      .toLowerCase();
  } else {
    parsed = str.replace("@", "").replace("\n", "").trim().toLowerCase();
  }
  parsed = parsed.split("?")[0];
  return parsed;
}
