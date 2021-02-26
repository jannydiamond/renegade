import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { HexGrid, Layout } from 'react-hexgrid'

import * as types from 'types'

import { getNeighbors, getServerNeighbors } from 'helpers'
import { RootState, selectors, actions } from 'Redux/Store'

import './App.css'

import Hexagon from 'components/Hexagon'
import Text from 'components/Text'

const mapStateToProps = (state: RootState) => ({
  hexagons: selectors.Network.Board.getHexagonArray(state),
  server: selectors.Network.Server.getServer(state),
  placedServer: selectors.Network.Server.getPlacedServer(state),
})

const mapDispatchToProps = {
  setHexagons: actions.Network.Board.setHexagons,
  resetHexagons: actions.Network.Board.resetHexagons,
  addServer: actions.Network.Server.addServer,
  removeServer: actions.Network.Server.removeServer,
  resetServer: actions.Network.Server.resetServer,
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {}

const App = ({
  hexagons,
  server,
  placedServer,
  setHexagons,
  resetHexagons,
  addServer,
  removeServer,
  resetServer,
}: Props) => {
  const [serverColor, setServerColor] = useState<types.ServerType>('blue')

  const placeServer = (type: types.ServerType, hex: types.HexagonTile) => {
    const hexNeighbors = getNeighbors(hexagons, hex)

    const serverNeighbors = getServerNeighbors(type, hexNeighbors)
    const serverNeighborsIds = serverNeighbors.map((server: any) => server.id)

    const hexagonsWithoutHexAndNeightbors = hexagons.filter(
      (h: types.HexagonTile) =>
        h.id !== hex.id &&
        !serverNeighbors.find(
          (neighbor: any) => neighbor && neighbor.id === h.id
        )
    )

    const newHex = {
      ...hex,
      text: '6',
      color: type,
      blocked: true,
    }

    const newNeighbors = serverNeighbors.map((hex: any) => {
      return {
        ...hex,
        color: type,
        blocked: true,
      }
    })

    const newState = [
      ...hexagonsWithoutHexAndNeightbors,
      newHex,
      ...newNeighbors,
    ]

    setHexagons(newState)
    addServer(type, [newHex.id, ...serverNeighborsIds])
  }

  useEffect(() => {
    resetBoard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const resetBoard = () => {
    resetHexagons()
    resetServer()
    setServerColor('blue')
  }

  const handleRemoveServer = (type: types.ServerType) => {
    const updatedHexagones = hexagons.map((hexagon: types.HexagonTile) => {
      if (server[type].includes(hexagon.id)) {
        return {
          id: hexagon.id,
          q: hexagon.q,
          r: hexagon.r,
          s: hexagon.s,
          blocked: !hexagon.blocked,
        }
      }

      return hexagon
    })

    removeServer(type)
    setHexagons(updatedHexagones)
  }

  const handleClick = (hex: any) => {
    hex.blocked
      ? alert('cant place here')
      : placedServer.includes(serverColor)
      ? alert('server already placed')
      : placeServer(serverColor, hex)
  }

  return (
    <div className="App">
      <div className="App-server-buttons">
        <button
          className={serverColor === 'blue' ? 'active' : ''}
          onClick={() => setServerColor('blue')}
          disabled={placedServer.includes('blue')}
        >
          Set blue Server
        </button>
        <button
          className={serverColor === 'red' ? 'active' : ''}
          onClick={() => setServerColor('red')}
          disabled={placedServer.includes('red')}
        >
          Set red Server
        </button>
        <button
          className={serverColor === 'green' ? 'active' : ''}
          onClick={() => setServerColor('green')}
          disabled={placedServer.includes('green')}
        >
          Set green Server
        </button>
        <button
          className={serverColor === 'purple' ? 'active' : ''}
          onClick={() => setServerColor('purple')}
          disabled={placedServer.includes('purple')}
        >
          Set purple Server
        </button>
        <button
          className={serverColor === 'yellow' ? 'active' : ''}
          onClick={() => setServerColor('yellow')}
          disabled={placedServer.includes('yellow')}
        >
          Set yellow Server
        </button>
        <br />
        <button onClick={resetBoard}>Reset board</button>
      </div>
      <div className="App-server-buttons">
        <button
          onClick={() => handleRemoveServer('blue')}
          disabled={!placedServer.includes('blue')}
        >
          Remove blue Server
        </button>
        <button
          onClick={() => handleRemoveServer('red')}
          disabled={!placedServer.includes('red')}
        >
          Remove red Server
        </button>
        <button
          onClick={() => handleRemoveServer('green')}
          disabled={!placedServer.includes('green')}
        >
          Remove green Server
        </button>
        <button
          onClick={() => handleRemoveServer('purple')}
          disabled={!placedServer.includes('purple')}
        >
          Remove purple Server
        </button>
        <button
          onClick={() => handleRemoveServer('yellow')}
          disabled={!placedServer.includes('yellow')}
        >
          Remove yellow Server
        </button>
      </div>
      <HexGrid width={1200} height={1200} viewBox="-200 -200 400 400">
        <Layout size={{ x: 10, y: 10 }} spacing={1}>
          {hexagons.map((hex: any, i: number) => (
            <Hexagon
              key={i}
              q={hex.q}
              r={hex.r}
              s={hex.s}
              blocked={hex.blocked}
              color={hex.color ? hex.color : '#dadada'}
              onClick={() => handleClick(hex)}
            >
              <Text color={hex.color ? hex.color : '#dadada'}>
                {hex.text ? hex.text : `${hex.q}, ${hex.r}, ${hex.s}`}
              </Text>
            </Hexagon>
          ))}
        </Layout>
      </HexGrid>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(App))
