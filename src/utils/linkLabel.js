// Turns a full URL into a short label like "github.com/user/repo" for display.
export function getLinkLabel(link) {
  try {
    const url = new URL(link);
    const path = url.pathname !== "/" ? url.pathname.replace(/\/$/, "") : "";
    return `${url.hostname.replace(/^www\./, "")}${path}`;
  } catch {
    return link;
  }
}
