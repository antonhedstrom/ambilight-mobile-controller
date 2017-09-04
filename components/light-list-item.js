import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default class LightListItem extends React.Component {
  componentDidMount() {
    this.state.on = false;
  }
  toggleActivation(value) {
    this.setState({
      on: value
    });
  }
  render() {
    return (
      <View style={styles.layout}>
        <View style={styles.title}>
          <Text style={styles.txtTitle}>{this.props.item.title}</Text>
        </View>
        <View style={styles.actions}>
          <Text>{this.props.item.releaseYear}</Text>
          <Switch onValueChange={this.toggleActivation.bind(this)} value={this.state.on} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    backgroundColor: 'red'
  },
  txtTitle: {
    fontSize: 15
  },
  actions: {
    backgroundColor: 'purple',
    flex: 0
  }
});
