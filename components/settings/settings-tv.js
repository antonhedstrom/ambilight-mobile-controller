import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button
} from 'react-native';

export default class SettingsTV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: props.ip,
      port: props.port || '1925',
      rootPath: props.rootPath || '1',
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  onChangeValue(key, value) {
    this.setState(key, value);
    this.props.onChange(key, value);
  }
  render() {
    return (
      <View style={styles.outerLayout}>
        <View style={styles.container}>
          <TextInput
            style={styles.ipInput}
            placeholder="X.X.X.X"
            keyboardType="numbers-and-punctuation"
            onChangeText={value => this.onChangeValue('ip', value)}
            value={this.state.ip}
            />
          <Text style={styles.separatorText}>:</Text>
          <TextInput
            style={styles.portInput}
            placeholder="1925"
            keyboardType="numeric"
            onChangeText={value => this.onChangeValue('port', value)}
            value={this.state.port}
            />
          <Text style={styles.separatorText}>/</Text>
          <TextInput
            style={styles.pathInput}
            placeholder="1"
            onChangeText={value => this.onChangeValue('rootPath', value)}
            value={this.state.rootPath}
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
    alignItems: 'flex-start'
  },
  ipInput: {
    flex: 3,
    height: 50
  },
  portInput: {
    flex: 1,
    height: 50
  },
  pathInput: {
    flex: 1,
    height: 50
  },
  separatorText: {
    height: 50,
    lineHeight: 45,
    paddingLeft: 5,
    paddingRight: 5
  }

});
