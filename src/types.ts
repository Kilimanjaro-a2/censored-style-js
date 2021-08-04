export type censorshipType = "marker" | "strikethrough" | "blur" | "square" | "caligraphy" | "visible"
export type rotationSet = {
  child1: number,
  child3: number,
  child5n: number,
  child7n: number
}

export const defaultRotationSet: rotationSet = {
  child1: 0,
  child3: 0,
  child5n: 0,
  child7n: 0
}
