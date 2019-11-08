import { combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./ducks/auth";
import providersReducer from "./ducks/providers";
import alertReducer from "./ducks/alert";
import establishmentsReducer from "./ducks/establishment";


const reducers = combineReducers({
    auth: authReducer,
    ec: establishmentsReducer,
    providers: providersReducer,
    alert: alertReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist:[ 'auth', 'ec' ]
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore( persistedReducer );
const persistor = persistStore(store);

export { store, persistor };