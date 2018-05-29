import React from 'react'
import {
    View,
    TextInput,
    Button,
    ActivityIndicator,
    Alert
} from 'react-native'
import {requestWeatherAction, ScreenState} from './Actions'
import {WeatherExists} from "../../Components/WeatherCityComponents";
import {connect} from "react-redux";


const mapStateToProps = state => ({
    screenState: state.reducer.screenState,
    weatherInfo: state.reducer.weatherInfo
})

const mapDispatchToProps = dispatch => ({
    onClick: cityName => dispatch(requestWeatherAction(cityName))
})

class InputCityScreen extends React.Component{
    state = {
        cityName: ''
    }

//обязательно если используем Пропсы
componentWillReceiveProps = nextProps => {
        if (nextProps.screenState === ScreenState.ERROR) {//
            Alert.alert('Ошибка', 'Город не найден')
        }
    }

    render = () =>
        <View style={{
            flex: 1//на весь экран
        }}>
            <TextInput
                placeholder='Введите название города'
                onChangeText={(text) => this.setState({cityName: text})}/>
            {this.renderScreenState(this.props.screenState)}
        </View>

    renderScreenState = screenState => {
        switch (screenState) {
            case ScreenState.LOADING: {
                return <ActivityIndicator/>
            }

            default: {
               return (
                    <View>
                        <Button
                            onPress={() => {
                                this.props.onClick(this.state.cityName)
                                console.log(this.state.cityName)
                            }}
                            title='Найти'/>
                        <WeatherExists weather={this.props.weatherInfo} city={this.state.cityName}/>
                </View>);
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputCityScreen)