import React from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  View,
  Vibration,
  TouchableHighlight
} from 'react-native';
import { debounce } from 'underscore';

import * as API from '../../helpers/api-caller';

export default class LightListItemAmbilight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panelAttached: props.item.tvPanel && props.item.tvPanel.active
    };
  }
  togglePanelAttached(value) {
    const data = {
      tvPanel: {
        active: value
      }
    };
    this.updateLight(data);
    this.setState({
      panelAttached: value
    });
  }
  updateLight(data) {
    const lightId = this.getLightId();
    API.PUT('/lights/' + lightId, data).then(light => {
      Vibration.vibrate(200);
    });
  }
  onTitlePress = () => {
    return this.props.navigation.navigate('LightDetails', {
      light: this.props.item,
      id: this.getLightId()
    });
  }
  getLightId() {
    return this.props.item.attributes.attributes.id;
  }
  render() {
    const {attributes, state} = this.props.item;
    const light = attributes.attributes;
    return (
      <View style={styles.outerLayout}>
        <View style={styles.innerLayout}>
          <TouchableHighlight onPress={this.onTitlePress}
            underlayColor="transparent"
            style={styles.title}
            >
            <View >
              <Text style={styles.lightName}>{light.name}</Text>
              <Text style={styles.lightModel}>{light.type}</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.actions}>
            <Switch value={this.state.panelAttached}
              onValueChange={this.togglePanelAttached.bind(this)}
              />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerLayout: {
  },
  innerLayout: {
    flex: 1,
    flexDirection: 'row',
    bottom: 3
  },
  title: {
    flex: 1,
    paddingLeft: 15,
    paddingTop: 5
  },
  lightName: {
    fontSize: 18
  },
  lightModel: {
    fontSize: 13,
    color: '#999999'
  },
  actions: {
    flex: 0,
    bottom: 3,
    top: 2,
    paddingRight: 10,
    paddingLeft: 20
  }
});
