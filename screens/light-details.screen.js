import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import * as API from '../helpers/api-caller';
import LightDetails from '../components/lights/light-details';

export default class LightDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Unknown'
    };
  }
  static navigationOptions = {
    title: 'Light',
  }
  componentWillMount() {
    this.fetchData();
  }
  fetchData() {
    const lightId = this.props.navigation.state.params.id;
    API.GET('/lights/' + lightId).then(data => {
      this.setState({ light: data });
    });
  }
  render() {
    return (
      <View>
        <LightDetails
          item={this.state.light}
          navigation={this.props.navigation}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1
  }
});
