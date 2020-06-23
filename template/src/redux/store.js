import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import localForage from 'localforage';
import { defaultReducer } from './default-reducer';

export const saga = createSagaMiddleware();

// Define the Reducers that will always be present in the application
const staticReducers = {
  auth: defaultReducer,
};

const persistConfig = {
  key: 'root',
  storage: localForage,
  whitelist: ['auth'],
};

// Configure the store
function configureStore() {
  const middlware =
    process.env.NODE_ENV === 'development'
      ? applyMiddleware(logger, saga)
      : applyMiddleware(saga);

  const store = createStore(createReducer(), middlware);

  store.asyncReducers = {};

  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
    if (store.persistor && typeof store.persistor.persist === 'function') {
      store.persistor.persist();
    }
  };

  // Return the modified store
  return store;
}

function createReducer(asyncReducers) {
  return persistReducer(
    persistConfig,
    combineReducers({
      ...staticReducers,
      ...asyncReducers,
    })
  );
}

export const store = configureStore();
export const persistor = persistStore(store);

store.persistor = persistor;
