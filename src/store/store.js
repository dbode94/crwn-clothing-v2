import { compose, createStore, applyMiddleware } from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const persistConfig = {
    key: 'root',
    storage: storage, //for most browsers the storage from redux-persist lib is the local storage
    blacklist: ['user'] // since we get the user from a auth method from Firebase which persists after reloads, we might want to blacklist it
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean) // using the condition logic evaluation order to log only if we are in development, and since it is using a array, we can leverage the filter method to avoid passing 'false' if condition is not met

/*if you want your website to be Redux DevTool available, you need to modify your compose method -> make sure you are not in production,
you have a window object and "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__" tools exists (which is a protected keyword)*/

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composeEnhancers);

export const persistor = persistStore(store);