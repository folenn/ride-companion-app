import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import storage from '@react-native-community/async-storage';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import rootReducer from './store/reducers';
import { rootEpic } from './store/epics';
import { compact, omit } from 'lodash';


let reduxCompose = compose;
let blacklistTransform = createTransform(
	(inboundState: any, key) => {
		if (key === 'auth') {
			return omit(inboundState, ['status.error']);
		} else {
			return inboundState;
		}
	}, (outboundState, key) => outboundState
);

const configureStore = () => {
	const epicMiddleware = createEpicMiddleware();
	const blacklistPaths: string[] = ['status.error'];

	const persistConfig = {
		key: 'auth',
		blacklist: ['error', 'rides'],
		storage,
		timeout: 0
	};

	const middlewares = compact(__DEV__ ? [createLogger(), epicMiddleware] : [epicMiddleware]);

	let debuggWrapper = (data: any) => data;
	if (__DEV__) {
		// @ts-ignore
		debuggWrapper = composeWithDevTools({realtime: true, port: 8000});
	}

	const persistedReducer = persistReducer(persistConfig, rootReducer);

	const store = createStore(
		persistedReducer,
		{},
		debuggWrapper(compose(applyMiddleware(...middlewares)))
	);

	const persistor = persistStore(store);

	epicMiddleware.run(rootEpic);

	return {store, persistor};
};

export default configureStore;
