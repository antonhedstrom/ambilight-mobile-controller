import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Switch,
  Slider,
  Text,
  Button
} from 'react-native';

import * as Api from '../../helpers/api-caller';
import * as LocalStore from '../../helpers/async-store';

import SettingsServer from './settings-server';
import SettingsTV from './settings-tv';
import SettingsHue from './settings-hue';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serverHost: 'localhost:3000',
      tvIp: '',
      tvPort: '',
      tvRootPath: '',
      hueIp: '',
      huePort: ''
    };
  }
  componentDidMount() {
    LocalStore.get('host').then(host => {
      console.log('host', host);
      this.setState({
        serverHost: host
      });
    });
  }
  onServerChange(host) {
    this.setState({
      serverHost: host
    });
  }
  onTVChange(newData) {
    this.setState({
      tvIp: newData.ip,
      tvPort: newData.port,
      tvRootPath: newData.rootPath
    });
  }
  onHueChange(newData) {
    this.setState({
      hueIp: newData.ip,
      huePort: newData.port
    });
  }
  onPressSave() {
    const tvData = {
      ip: this.state.tvIp,
      port: this.state.tvPort,
      rootPath: this.state.tvRootPath
    };
    const hueData = {
      ip: this.state.hueIp,
      port: this.state.huePort
    };
    console.log('this.state.serverHost', this.state.serverHost);
    LocalStore.set('host', this.state.serverHost).then(() => {
      console.log('New host stored.');
    });
    // Api.POST('/tv', tvData).then(data => {
    //   console.log('TTVVVV DATA', data);
    // });
    // Api.POST('/hue', hueData).then(data => {
    //   console.log('HUUUUEEE DATA', data);
    // });

    this.props.navigation.navigate('Lights');
  }
  render() {
    return (
      <View style={styles.outerLayout}>
        <View style={styles.section}>
          <SettingsServer onChange={this.onServerChange.bind(this)}
            host={this.state.serverHost}
            />
        </View>

        <View style={styles.section}>
          <Text>Philips TV</Text>
          <SettingsTV onChange={this.onTVChange.bind(this)}
            ip={this.state.tvIp}
            port={this.state.tvPort}
            rootPath={this.state.tvRootPath}
            />
        </View>

        <View style={styles.section}>
          <Text>Philips HUE Bridge</Text>
          <SettingsHue onChange={this.onHueChange.bind(this)}
            ip={this.state.hueIp}
            port={this.state.huePort}
            />
        </View>

        <View style={styles.actions}>
          <Button
            title="Save settings"
            disabled={this.state.serverHost === ''}
            onPress={() => this.onPressSave()} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerLayout: {
    top: 1,
    bottom: 10,
  },
  section: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  actions: {
    marginTop: 20
  }
});
