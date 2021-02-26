import { combineReducers } from 'redux-loop'

import * as Board from './Board'
import * as Server from './Server'

///////////
// STATE //
///////////

export type State = {
  Board: Board.State
  Server: Server.State
}

export const initialState = {
  Board: Board.initialState,
  Server: Server.initialState,
}

/////////////
// ACTIONS //
/////////////

export const actions = {
  Board: Board.actions,
  Server: Server.actions,
}

export type Action =
  | Board.Action
  | Server.Action

/////////////
// REDUCER //
/////////////

export const Reducer = combineReducers({
  Board: Board.Reducer,
  Server: Server.Reducer,
})

///////////////
// SELECTORS //
///////////////

export const selectors = {
  Board: Board.selectors,
  Server: Server.selectors,
}
