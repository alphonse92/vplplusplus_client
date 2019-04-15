export function printErrorByEnv(stack) {
  if (process.env.NODE_ENV === 'development') {
    console.error(stack)
  }
}