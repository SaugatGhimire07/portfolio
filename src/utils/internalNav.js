// Project links are usually external URLs (opened in a new tab), but a few
// point at in-app routes like "/kyc-case-study". This lets those navigate
// client-side via the App-level pushState router instead of doing a full
// page reload, while still behaving like a normal link for modified clicks
// (cmd/ctrl/shift-click, middle click) so "open in new tab" keeps working.
export function isInternalLink(link) {
  return typeof link === "string" && link.startsWith("/");
}

export function handleInternalLinkClick(event, link, onNavigate) {
  if (!onNavigate || event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  event.preventDefault();
  onNavigate(link);
}
