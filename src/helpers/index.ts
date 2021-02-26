import * as types from 'types'

export const getNeighbors = (
  hexagons: types.HexagonTile[],
  hex: types.HexagonBase
): types.Neighbors => {
  const neightborTop = hexagons.find(
    (h: types.HexagonTile) => h.r === hex.r - 1 && h.s === hex.s + 1
  )
  const neightborTopRight = hexagons.find(
    (h: types.HexagonTile) => h.q === hex.q + 1 && h.r === hex.r - 1
  )
  const neightborBottomRight = hexagons.find(
    (h: types.HexagonTile) => h.q === hex.q + 1 && h.s === hex.s - 1
  )
  const neightborBottom = hexagons.find(
    (h: types.HexagonTile) => h.r === hex.r + 1 && h.s === hex.s - 1
  )
  const neightborBottomLeft = hexagons.find(
    (h: types.HexagonTile) => h.q === hex.q - 1 && h.r === hex.r + 1
  )
  const neightborTopLeft = hexagons.find(
    (h: types.HexagonTile) => h.q === hex.q - 1 && h.s === hex.s + 1
  )

  return {
    top: neightborTop,
    topRight: neightborTopRight,
    bottomRight: neightborBottomRight,
    bottom: neightborBottom,
    bottomLeft: neightborBottomLeft,
    topLeft: neightborTopLeft,
  }
}

export const getServerNeighbors = (
  type: types.ServerType,
  hexNeighbors: types.Neighbors
) => {
  switch (type) {
    case 'yellow':
      return [
        { ...hexNeighbors.bottom, text: '5' },
        { ...hexNeighbors.bottomLeft, text: '4' },
        { ...hexNeighbors.topLeft, text: '3' },
        { ...hexNeighbors.top, text: '2' },
        { ...hexNeighbors.topRight, text: '1' },
      ]
    case 'red':
      return [
        { ...hexNeighbors.top, text: '5' },
        { ...hexNeighbors.topRight, text: '4' },
        { ...hexNeighbors.bottomRight, text: '3' },
        { ...hexNeighbors.bottom, text: '2' },
        { ...hexNeighbors.bottomLeft, text: '1' },
      ]
    case 'purple':
      return [
        { ...hexNeighbors.topRight, text: '5' },
        { ...hexNeighbors.bottomRight, text: '4' },
        { ...hexNeighbors.bottom, text: '3' },
        { ...hexNeighbors.bottomLeft, text: '2' },
        { ...hexNeighbors.topLeft, text: '1' },
      ]
    case 'green':
      return [
        { ...hexNeighbors.topLeft, text: '5' },
        { ...hexNeighbors.top, text: '4' },
        { ...hexNeighbors.topRight, text: '3' },
        { ...hexNeighbors.bottomRight, text: '2' },
        { ...hexNeighbors.bottom, text: '1' },
      ]
    default:
      return [
        { ...hexNeighbors.bottomLeft, text: '5' },
        { ...hexNeighbors.topLeft, text: '4' },
        { ...hexNeighbors.top, text: '3' },
        { ...hexNeighbors.topRight, text: '2' },
        { ...hexNeighbors.bottomRight, text: '1' },
      ]
  }
}
