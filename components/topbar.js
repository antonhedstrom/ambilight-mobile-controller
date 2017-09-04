import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Topbar extends React.Component {
  render() {
    return (
        <View style={styles.header}>
          <Text style={styles.title}>Hue Controller</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    justifyContent: 'center'
  },
  title: {
    fontSize: 30
  }
});
