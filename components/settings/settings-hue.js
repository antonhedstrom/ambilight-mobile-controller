import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';

export default class SettingsHue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: props.ip,
      port: props.port || '80'
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <View style={styles.outerLayout}>
        <View style={styles.container}>
          <TextInput
            style={styles.ipInput}
            placeholder="X.X.X.X"
            keyboardType="numbers-and-punctuation"
            onChangeText={value => this.setState({ip: value})}
            value={this.state.ip}
            />
          <Text style={styles.separatorText}>:</Text>
          <TextInput
            style={styles.portInput}
            placeholder="1925"
            keyboardType="numeric"
            onChangeText={value => this.setState({port: value})}
            value={this.state.port}
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerLayout: {
    top: 1,
    bottom: 10
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ipInput: {
    flex: 3,
    height: 50
  },
  portInput: {
    flex: 1,
    height: 50
  },
  separatorText: {
    flex: 0,
    height: 50,
    lineHeight: 45,
    paddingLeft: 5,
    paddingRight: 5
  }

});
