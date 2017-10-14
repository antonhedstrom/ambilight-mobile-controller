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

import { PUT } from '../../helpers/api-caller';

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
    PUT('/lights/' + lightId, data).then(light => {
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
        <View style={styles.topSection}>
          <View style={styles.titleContainer}>
            <Text style={styles.lightName}>{light.name}</Text>
            <Text style={styles.lightModel}>{light.type}</Text>
          </View>

          <View style={styles.onoff}>
            <Switch value={this.state.on}
              onValueChange={this.toggleActivation.bind(this)}
              disabled={!state.attributes.reachable}
              />
          </View>
        </View>

        <View style={styles.sliderContainer}>
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
    top: 20
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  sliderContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    top: 10,
  },
  titleContainer: {
    flex: 1,
    paddingLeft: 15,
    paddingTop: 5
  },
  onoff: {
    flex: 0,
    paddingRight: 10,
    paddingLeft: 20
  },
  lightName: {
    fontSize: 30
  },
  lightModel: {
    fontSize: 13,
    color: '#999999'
  }
});
