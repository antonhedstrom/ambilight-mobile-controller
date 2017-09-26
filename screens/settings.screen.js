import React from 'react';
import {
  View,
  Button
} from 'react-native';

import Settings from '../components/settings/settings';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };
  render() {
    return (
      <View>
        <Settings navigation={this.props.navigation}/>
      </View>
    );
  }
}
