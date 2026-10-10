// "GIS & GEOINTELLIGENCE" -> "GIS & Geointelligence": conserva siglas cortas y normaliza el resto.
const KEEP_UPPER = new Set(["GIS", "BI", "IA", "&"]);
const LOWER = new Set(["DE", "Y"]);
export function displayName(title) {
  return title
    .split(" ")
    .map((w) => {
      if (KEEP_UPPER.has(w)) return w;
      if (LOWER.has(w)) return w.toLowerCase();
      if (w === "DEVOPS") return "DevOps";
      return w.charAt(0) + w.slice(1).toLowerCase();
    })
    .join(" ");
}
