import { Page } from "../types"
import { State } from "./state"

export type Action = {
  type: 'SET_PAGE';
  payload: {
    page: Page;
  };
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload.page,
      }
    default:
      return state
  }
}

export const setPage = (page: Page): Action => {
  return {
    type: 'SET_PAGE',
    payload: { page },
  }
}