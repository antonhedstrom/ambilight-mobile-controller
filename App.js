import React from 'react';
import { StackNavigator } from 'react-navigation';

// import HomeScreen from './screens/lights.screen';
import LightsScreen from './screens/lights.screen';
import LightDetailsScreen from './screens/light-details.screen';
import SettingsScreen from './screens/settings.screen';


const NavigatedApp = StackNavigator({
  Lights: { screen: LightsScreen },
  LightDetails: {
    screen: LightDetailsScreen,
    path: 'light/:id'
  },
  Settings: { screen: SettingsScreen }
}, {
  initialRouteName: 'Lights',
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigatedApp />
    );
  }
}
