import { Persistor } from 'redux-persist';
import { Store as ReduxStore } from 'redux';
import { AuthState } from '~/src/screen/app-state/reducer/types';

type Reducer = (state: any | undefined, action: any) => void;

export interface StoreState {
  auth?: AuthState;
}

export interface Store extends ReduxStore {
  injectReducer: (key: string, reducer: Reducer) => void;

  getState: () => StoreState;
}

export const store: Store;
export const persistor: Persistor;

export interface Saga {
  run: (_: () => Generator<any>) => void;
}

export const saga: Saga;
