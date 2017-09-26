import React from 'react';
import {
  StyleSheet,
  View,
  Switch,
  Slider,
  Text,
  TextInput,
  Image,
  AsyncStorage
} from 'react-native';

import * as Http from '../../helpers/http-requests';

// Icons
const iconCheckGreen = require('../../assets/icons/check_green.png')
const iconCrossRed = require('../../assets/icons/cross_red.png')

export default class SettingsRemote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      host: props.host || '',
      connectionStatus: 'none'
    }
  }
  componentDidMount() {
    this.testConnection(this.state.host);
  }
  componentWillUnmount() {
    if ( this.timerId ) {
      clearTimeout(this.timerId);
    }
  }
  componentWillReceiveProps(nextProps) {
    if ( this.state.host !== nextProps.host ) {
      this.setState({
        host: nextProps.host
      });
      this.testConnection(nextProps.host);
    }
  }
  testConnection(host) {
    Http.GET('http://' + host + '/ping').then(data => {
      if ( data.status === 'pong' ) {
        this.setState({
          connectionStatus: 'good'
        });
      }
      else {
        this.setState({
          connectionStatus: 'incorrect-response'
        });
      }
    }).catch(err => {
      this.setState({
        connectionStatus: 'bad'
      });
    });
  }
  onPressTestConnection() {
    this.testConnection(this.state.host);
  }
  getStatusIcon(status) {
    let iconSrc;
    switch(status) {
      case 'good':
        iconSrc = iconCheckGreen;
        break;
      case 'bad':
        iconSrc = iconCrossRed;
        break;
      case 'incorrect-response':
        // TODO: Add question mark or similiar instead?
        iconSrc = iconCrossRed;
        break;
      default:
        // TODO: Add default icon?
        iconSrc = false;
    }
    if ( iconSrc ) {
      return (<Image style={styles.icon} source={iconSrc} />);
    }

    return null;
  }
  hostUpdate(val) {
    this.props.onChange(val);
    if ( this.timerId ) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(() => {
      this.testConnection(this.state.host);
    }, 200);
  }
  render() {
    return (
      <View style={styles.outerLayout}>
        <Text>Server IP running the App</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="X.X.X.X:3000"
            onChangeText={(text) => this.hostUpdate(text)}
            value={this.state.host}
            />
          <View style={styles.iconContainer}>
            {this.getStatusIcon(this.state.connectionStatus)}
          </View>
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
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  input: {
    flex: 1,
    height: 50
  },
  iconContainer: {
    top: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 30,
    height: 30
  }

});
