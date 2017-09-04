import React from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';

import LightListItem from './light-list-item';

export default class LightList extends React.Component {
  renderListItem({item}) {
    return <LightListItem item={item} />;
  }
  render() {
    return (
      <View>
        <FlatList
          data={this.props.lights}
          renderItem={this.renderListItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15
  }
});



/*data={[
            {key: 'key-1', name: 'Debugging', age: 3},
            {key: 'key-2', name: 'Performance', age: 33},
            {key: 'key-3', name: 'Gesture Responder System', age: 13},
            {key: 'key-4', name: 'JavaScript Environment', age: 2},
            {key: 'key-5', name: 'Direct Manipulation', age: 11},
            {key: 'key-6', name: 'Color Reference', age: 56}
          ]}*/
