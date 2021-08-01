export type censorshipType = "marker" | "strikethrough" | "blur" | "square" | "visible"
export type skewSet = {
  skew3: number,
  skew5n: number,
  skew7n: number
}

export const defaultSkewSet: skewSet = {
  skew3: 0,
  skew5n: 0,
  skew7n: 0
}
