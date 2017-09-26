import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

export default class Topbar extends React.Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    title: 'Hue Controller'
  }
  render() {
    return (
        <View style={styles.header}>
          <Text style={styles.title}>{this.props.title}</Text>
          <View style={styles.iconContainer}>
            <Image style={styles.settingsIcon} source={require('../assets/icons/gear.png')} />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    top: 40
  },
  title: {
    flex: 1,
    fontSize: 30
  },
  iconContainer: {

  },
  settingsIcon: {
    width: 20,
    height: 20,
    padding: 10
  }
});
