import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class LightListItemSimple extends React.Component {
  constructor(props) {
    super(props);
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
    const {attributes} = this.props.item;
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
  }
});
