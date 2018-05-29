import React from 'react'
import {
 Text
} from 'react-native'
import {Converter} from "../Utils/converterUtils";

export const WeatherExists = (props) => {
    const exists = props.weather;
    const choise = exists ? (<Text>` Температура в городе {props.city}: {Converter(exists.temp)} C`</Text>) :
        (<Text>Информация о текущей погоде</Text>)
    return choise
}