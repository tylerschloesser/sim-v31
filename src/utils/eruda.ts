export async function initEruda() {
  const eruda = await import('eruda')
  eruda.default.init()
}
