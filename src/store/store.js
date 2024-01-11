import { compose, createStore, applyMiddleware } from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./root-reducer";

const loggerMiddleware = (store) => (next) => (action) =>{
    if(!action.type){
        return next(action);
    }

    console.log('type: ',action.type);
    console.log('payload: ',action.payload)
    console.log('currentState: ',store.getState())

    next(action);

    console.log('next state: ', store.getState());
}

const persistConfig = {
    key: 'root',
    storage: storage, //for most browsers the storage from redux-persist lib is the local storage
    blacklist: ['user'] // since we get the user from a auth method from Firebase which persists after reloads, we might want to blacklist it
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [loggerMiddleware]

const composeEnhances = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composeEnhances);

export const persistor = persistStore(store);