import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default class LightListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { on: false };
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
          <Switch onValueChange={this.toggleActivation.bind(this)} value={this.state.on} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'row',
    bottom: 3
  },
  title: {
    flex: 1
  },
  txtTitle: {
    fontSize: 15
  },
  actions: {
    flex: 0,
    bottom: 3
  }
});
