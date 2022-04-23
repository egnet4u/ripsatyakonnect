export function parseShortCode(str) {
  if (str.includes("instagram.com/p/")) {
    return str
      .split("instagram.com/p/")[1]
      .split("?")[0]
      .replace("\n", "")
      .replace("/", "")
      .trim();
  }
}
