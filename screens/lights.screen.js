import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableHighlight
} from 'react-native';

import * as API from '../helpers/api-caller';
import LightList from '../components/lights/light-list';

export default class LightsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lights: []
    };
  }
  static navigationOptions = {
    title: 'Lights',
  }
  componentDidMount() {
    this.fetchData();
  }
  onSettingsClick() {
    this.props.navigation.navigate('Settings');
  }
  fetchData = () => {
    return API.GET('/lights').then(lights => {
      lights = lights.map(light => {
        light.key = light.attributes.attributes.uniqueid;
        return light;
      })
      this.setState({ lights });
      return lights;
    }).catch(err => {
      console.log(err);
    });
  }
  render() {
    return (
      <View style={styles.layout}>
        <View style={styles.iconContainer}>
          <TouchableHighlight onPress={this.onSettingsClick.bind(this)}>
            <Image style={styles.settingsIcon} source={require('../assets/icons/gear.png')} />
          </TouchableHighlight>
        </View>
        <View style={styles.listContainer}>
          <LightList
            lights={this.state.lights}
            navigation={this.props.navigation}
            onRefresh={this.fetchData}
            mode='ambilight'
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1
  },
  iconContainer: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 14,
    alignItems: 'flex-end'
  },
  listContainer: {
    flex: 1,
    paddingTop: 14
  },
  settingsIcon: {
    height: 25,
    width: 25,
    padding: 10
  }
});
