/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground
} from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

export default class App extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      city: "",
      weather: "",
      temperature: "",
      backgroundImage: require('./src/images/clouds.jpg')
    }
  }

  componentDidMount() {
    this.fetchCurrentLocationThenRequestWeatherData();
  }

  render() {
    return (
      <ImageBackground style={{flex: 1, alignItems: 'center'}} source={this.state.backgroundImage}>
        <Text style={{marginTop: 100, fontWeight: "500", fontSize: 40, color: 'white', backgroundColor: 'transparent'}}>
          {this.state.city}
        </Text>
        <Text style={{marginTop: 10, fontWeight: "normal", fontSize: 20, color: 'white', backgroundColor: 'transparent'}}>
          {this.state.weather}
        </Text>
        <Text style={{marginTop: 10, fontWeight: "normal", fontSize: 75, color: 'white', backgroundColor: 'transparent'}}>
          {this.state.temperature}
        </Text>
      </ImageBackground>
      // <View style={styles.container}>
      //   <Text style={styles.welcome}>
      //     Welcome to the jungle!!!
      //   </Text>
      //   <Text style={styles.instructions}>
      //     To get started, edit App.js
      //   </Text>
      //   <Text style={styles.instructions}>
      //     {instructions}
      //   </Text>
      // </View>

    );
  }

  fetchCurrentLocationThenRequestWeatherData() {
    navigator.geolocation.getCurrentPosition(
      currentPosition => {
          console.log(currentPosition);
          let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentPosition.coords.latitude}&lon=${currentPosition.coords.longitude}&units=metric&appid=e2d296a6fc0846926cf7825f5e3b6867`

          fetch(apiUrl)
            .then(response => response.json())
            .then(responseJson => {
              console.log(responseJson);
              
              this.setState({
                city: responseJson.name,
                weather: responseJson.weather[0].description,
                temperature: responseJson.main.temp
              });
            });
      },
      error => {
          console.log(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
