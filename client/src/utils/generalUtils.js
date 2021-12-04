export function getSessionId() {
  return window.location.pathname.split('/')[1]
}
