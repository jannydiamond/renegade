export type HexagonBase = {
  q: number
  r: number
  s: number
}

export type HexagonTile = HexagonBase & {
  id: string
  color?: string
  text?: string
  blocked: boolean
}

export type HexagonTiles = {
  [id: string]: HexagonTile
}

export type ServerType = 'red' | 'blue' | 'green' | 'yellow' | 'purple'

export type Neighbors = {
  top: HexagonTile | undefined
  topRight: HexagonTile | undefined
  bottomRight: HexagonTile | undefined
  bottom: HexagonTile | undefined
  bottomLeft: HexagonTile | undefined
  topLeft: HexagonTile | undefined
}
