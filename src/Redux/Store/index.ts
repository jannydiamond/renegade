
import { combineReducers, reduceReducers } from 'redux-loop'

import * as Network from 'Redux/Store/Network'

export type RootState = {
  Network: Network.State
}

export const initialState = {
  Network: Network.initialState
}

export const actions = {
  Network: Network.actions,
}

export type RootAction =
  | Network.Action

export const RootReducer = reduceReducers(
  combineReducers<RootState>({
    Network: Network.Reducer,
  })
)

export const selectors = {
  Network: Network.selectors
}
