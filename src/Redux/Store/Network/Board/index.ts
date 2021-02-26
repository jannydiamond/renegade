import { GridGenerator } from 'react-hexgrid'
import { createAction, ActionsUnion } from '@martin_hotell/rex-tils'
import { LoopReducer } from 'redux-loop'
import { createSelector } from 'reselect'
import { normalize, schema } from 'normalizr'

import * as types from 'types'

///////////
// STATE //
///////////

export type HexagonState = {
  byId: types.HexagonTiles
  allIds: string[] | any
}

export type State = {
  hexagons: HexagonState
}

const hexagons: types.HexagonTile[] = GridGenerator.hexagon(10).map(
  (hex: types.HexagonBase, index: number) => {
    return {
      ...hex,
      id: `hex-${index}`,
      blocked: false,
    }
  }
)

const hexagonSchema = new schema.Entity('hexagons');
const hexagonListSchema = new schema.Array(hexagonSchema);
const normalizedHexagons = normalize(hexagons, hexagonListSchema)

export const initialState: State = {
  hexagons: {
    byId: {
      ...normalizedHexagons.entities.hexagons as types.HexagonTiles
    },
    allIds: normalizedHexagons.result
  }
}

/////////////
// ACTIONS //
/////////////

export enum ActionTypes {
  SET_HEXAGONS = 'Network/Board/SET_HEXAGONS',
  RESET_HEXAGONS = 'Network/Board/RESET_HEXAGONS',
}

export const actions = {
  noOp: () => createAction('@@REDUX_LOOP/ENFORCE_DEFAULT_HANDLING'),
  setHexagons: (hexagons: types.HexagonTile[]) =>
    createAction(ActionTypes.SET_HEXAGONS, hexagons),
  resetHexagons: () => createAction(ActionTypes.RESET_HEXAGONS),
}

export type Action = ActionsUnion<typeof actions>

/////////////
// REDUCER //
/////////////

export const Reducer: LoopReducer<State, Action> = (
  state: State = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.SET_HEXAGONS: {
      const normalizedData = normalize(action.payload, hexagonListSchema);

      return {
        hexagons: {
          byId: {
            ...normalizedData.entities.hexagons as types.HexagonTiles
          },
          allIds: normalizedData.result
        }
      }
    }

    case ActionTypes.RESET_HEXAGONS: {
      return initialState
    }

    default: {
      return state
    }
  }
}

///////////////
// SELECTORS //
///////////////

export type BoardStateSlice = {
  Network: {
    Board: State
  }
}

const getBoardState = (state: BoardStateSlice) => state.Network.Board

const getBoardHexagons = createSelector([getBoardState], ({hexagons}: State) => hexagons)

const getHexagonArray = createSelector([getBoardState], ({hexagons}: State) => Object.values(hexagons.byId))

const getHexagonIds = createSelector([getBoardState], ({hexagons}: State) => hexagons.allIds)

export const selectors = {
  getBoardState,
  getBoardHexagons,
  getHexagonArray,
  getHexagonIds
}
