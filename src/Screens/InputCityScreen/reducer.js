import React from 'react'
import { Actions, ScreenState } from './Actions'
//обязательно должны быть состояния по умолчанию
const defaultState = {
    screenState: ScreenState.CONTENT,
    weatherInfo: null
}
//сам редьюсер
export const reducer = (prevState = defaultState, action) => {
    switch (action.type) {
        //только пошёл запрос
        case Actions.REQUEST_WEATHER: {
            return {
                screenState: ScreenState.LOADING,
                weatherInfo: null
            }
        }
//в случае успеха
        case Actions.REQUEST_WEATHER_SUCCESS: {
            return {
               screenState: ScreenState.CONTENT,
               weatherInfo: action.payload.weatherInfo
            }
        }
//в случае неудпчи
        case Actions.REQUEST_WEATHER_FAIL: {
            return {
                ...prevState,
                screenState: ScreenState.ERROR
            }
        }

        default: {
            return prevState
        }
    }
}