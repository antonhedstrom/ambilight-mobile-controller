import React from 'react';
import {
  StyleSheet,
  Switch,
  Slider,
  Text,
  View,
  Vibration
} from 'react-native';
import { debounce } from 'underscore';

import { POST } from '../../helpers/api-caller';

export default class LightDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      on: props.item.state.attributes.on,
      bri: props.item.state.attributes.bri
    };
    this.debounceSetBrightness = debounce(this.setBrightness.bind(this), 200);
  }
  componentWillReceiveProps(nextProps) {
    const newStatus = nextProps.item.state.attributes.on;
    if ( this.state.on !== newStatus ) {
      this.setState({
        on: newStatus
      });
    }
  }
  toggleActivation(value) {
    data = {
      on: value
    }
    this.updateLight(data);
    this.setState({
      on: value
    });
  }
  setBrightness(value) {
    value = parseInt(value, 10);
    data = {
      brightness: value
    }
    this.updateLight(data);
    this.setState({
      bri: value
    });
  }
  updateLight(data) {
    const lightId = this.getLightId();
    POST('/lights/' + lightId, data).then(light => {
      Vibration.vibrate(200);
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
        <Text style={styles.lightName}>{light.name}</Text>
        <Text style={styles.lightModel}>{light.type}</Text>

        <View style={styles.actions}>
          <Switch value={this.state.on}
            onValueChange={this.toggleActivation.bind(this)}
            disabled={!state.attributes.reachable}
            />
        </View>

        <View style={styles.slider}>
          <Slider value={this.state.bri}
            maximumValue={255}
            step={1}
            disabled={ !this.state.on || !state.attributes.reachable }
            onValueChange={this.debounceSetBrightness}
            />
        </View>
      </View>
    );
  }
}

LightDetails.defaultProps = {
  item: {
    attributes: { attributes: {} },
    state: { attributes: {} }
  }
};

const styles = StyleSheet.create({
  outerLayout: {
    flexDirection: 'column',
    top: 40
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
  },
  slider: {
    paddingLeft: 5,
    paddingRight: 5,
  }
});
