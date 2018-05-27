import React from 'react'
import { StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import {store} from "./store";
import {InputCityScreen} from "./Screens/InputCityScreen/InputCityScreen";

//экраны
const RootStack = StackNavigator({
    Home: {screen: InputCityScreen},
});

export class App extends React.Component {
    render = () =>//какой экран рисовать
        <Provider store={store}>
            <RootStack/>
        </Provider>
}



