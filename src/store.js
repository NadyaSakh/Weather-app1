import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import { reducer } from './Screens/InputCityScreen/reducer'
import { logger } from 'redux-logger'
import { requestWeatherEpic } from './Screens/InputCityScreen/Actions'

//проинициализировали редьюсер
export const rootReducer = combineReducers({
    reducer
})

//проинициализировали эпик
export const rootEpic = combineEpics(
    requestWeatherEpic
)

//мидалвары эпика
export const epicMiddleware = createEpicMiddleware(rootEpic);
//делаем хранилище

export const store = createStore(
    rootReducer,
    applyMiddleware(logger),
    applyMiddleware(epicMiddleware)
)