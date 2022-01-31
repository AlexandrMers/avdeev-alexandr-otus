export function calculateProcess (start: number, end: number, prependText: string): string {
  const calculatedProgress = Math.ceil((start / end) * 100)

  return `${prependText} - ${calculatedProgress > 100 ? 100 : calculatedProgress}%`
}
