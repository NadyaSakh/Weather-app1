import {Observable} from 'rxjs'
import {ajax} from 'rxjs/observable/dom/ajax';

const API_KEY = 'ab9547a7cf569e12a44a6dd3359cdd45'//ключ апи

export const ScreenState = {//состояния экрана
    LOADING: 'LOADING',
    CONTENT: 'CONTENT',
    ERROR: 'ERROR'
}

export const Actions = {//статус запроса
    REQUEST_WEATHER: 'REQUEST_WEATHER',
    REQUEST_WEATHER_SUCCESS: 'REQUEST_WEATHER_SUCCESS',
    REQUEST_WEATHER_FAIL: 'REQUEST_WEATHER_FAIL',
}

export const requestWeatherAction = cityName => ({//функция запросить погоду
    type: Actions.REQUEST_WEATHER,
    payload: {//полезная нагрузка
        cityName: cityName
    }
})

export const requestWeatherEpic = action$ =>//эпик, выделить поток, получить данные
    action$.ofType(Actions.REQUEST_WEATHER)
        .mergeMap(action =>
            ajax.getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${action.payload.cityName}&appid=${API_KEY}`)
                .map(response => {
                    console.log(response)
                    if (response) {
                        return requestWeatherSuccess({
                            temp: response.main.temp
                        })
                    }
                    else {
                        return requestWeatherFail()
                    }
                })
                .catch(error => {
                    console.log(error)
                    // return Observable.of(Actions.REQUEST_WEATHER_FAIL)
                    return Observable.of(requestWeatherFail())
                    // return requestWeatherFail()
                })
        )

const requestWeatherSuccess = (weatherInfo) => ({//функция на случай все удачно
    type: Actions.REQUEST_WEATHER_SUCCESS,
    payload: {
        weatherInfo
    }
})

const requestWeatherFail = () => ({//функция на случай неудачи
    type: Actions.REQUEST_WEATHER_FAIL,
    payload: {
        error: "город не найден"
    }

})