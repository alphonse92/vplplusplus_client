export function printErrorByEnv(stack) {
  if (window.__env__.NODE_ENV === 'development') {
    console.error(stack)
  }
}