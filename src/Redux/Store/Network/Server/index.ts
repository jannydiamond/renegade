import { createAction, ActionsUnion } from '@martin_hotell/rex-tils'
import { createSelector } from 'reselect'
import { LoopReducer } from 'redux-loop'

import * as types from 'types'

///////////
// STATE //
///////////

export type State = {
  server: {
    [id: string]: string[]
  }
  placedServer: types.ServerType[]
  availableServer: types.ServerType[]
}
export const initialState: State = {
  server: {},
  placedServer: [],
  availableServer: ['blue', 'green', 'purple', 'red', 'yellow']
}

/////////////
// ACTIONS //
/////////////

export enum ActionTypes {
  ADD_SERVER = 'Network/Server/ADD_SERVER',
  REMOVE_SERVER = 'Network/Server/REMOVE_SERVER',
  RESET_SERVER = 'Network/Server/RESET_SERVER',
}

export const actions = {
  noOp: () => createAction('@@REDUX_LOOP/ENFORCE_DEFAULT_HANDLING'),
  addServer: (type: types.ServerType, hexagonIds: string[]) =>
    createAction(ActionTypes.ADD_SERVER, {
      type,
      hexagonIds
    }),
  removeServer: (type: types.ServerType) =>
    createAction(ActionTypes.REMOVE_SERVER, type),
  resetServer: () => createAction(ActionTypes.RESET_SERVER),
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
    case ActionTypes.ADD_SERVER: {
      const { type, hexagonIds } = action.payload

      const newState = {
        ...state,
        server: {
          ...state.server,
          [type]: hexagonIds
        },
        placedServer: [...state.placedServer, type]
      }

      return newState
    }

    case ActionTypes.REMOVE_SERVER: {
      const filteredPlacedServers = state.placedServer.filter(
        (server: types.ServerType) => server !== action.payload
      )

      const newState = {
        ...state,
        server: {
          ...state.server,
          [action.payload]: []
        },
        placedServer: filteredPlacedServers
      }

      return newState
    }

    case ActionTypes.RESET_SERVER: {
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

export type ServerStateSlice = {
  Network: {
    Server: State
  }
}

const getServerState = (state: ServerStateSlice) => state.Network.Server

const getServer = createSelector([getServerState], ({server}: State) => server)
const getPlacedServer = createSelector([getServerState], ({placedServer}: State) => placedServer)
const getAvailableServer = createSelector([getServerState], ({availableServer}: State) => availableServer)

export const selectors = {
  getServerState,
  getServer,
  getPlacedServer,
  getAvailableServer,
}
