import React from 'react'
import { Page } from '../types'
import { Action } from './reducer'

export type State = {
  page: Page;
};

const initialState: State = {
  page: 'home',
}

export const StateContext = React.createContext<
  [State, React.Dispatch<Action>]
>([initialState, () => initialState])

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateValue = () => React.useContext(StateContext)
