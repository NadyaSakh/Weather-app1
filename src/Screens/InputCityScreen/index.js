import {requestWeatherAction} from "./Actions";
import {InputCityScreen} from "./InputCityScreen";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    screenState: state.reducer.screenState,
    weatherInfo: state.reducer.weatherInfo
})

const mapDispatchToProps = dispatch => ({
    onClick: cityName => dispatch(requestWeatherAction(cityName))
})

export default connect(mapStateToProps, mapDispatchToProps)(InputCityScreen)