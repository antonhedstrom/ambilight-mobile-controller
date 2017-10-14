import React from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';

import LightListItemSimple from './light-list-item-simple';
import LightListItemAmbilight from './light-list-item-ambilight';
import LightListItemBrightness from './light-list-item-brightness';
import LightListSeparator from './light-list-separator';

export default class LightList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }
  renderListItem = ({item}) => {
    let itemComponent;
    switch (this.props.mode) {
      case 'simple':
        itemComponent = (<LightListItemSimple
          item={item}
          navigation={this.props.navigation}
        />);
        break;
      case 'ambilight':
        itemComponent = (<LightListItemAmbilight
          item={item}
          navigation={this.props.navigation}
        />);
        break;
      default:
        itemComponent = (<LightListItemBrightness
          item={item}
          navigation={this.props.navigation}
        />);
    }
    return itemComponent;
  }
  separator() {
    return <LightListSeparator />;
  }
  handleRefresh = () => {
    this.setState({
      refreshing: true
    });
    this.props.onRefresh().then(d => {
      this.setState({
        refreshing: false
      });
    })
  }
  render() {
    return (
      <View>
        <FlatList
          data={this.props.lights}
          renderItem={this.renderListItem}
          ItemSeparatorComponent={this.separator}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
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
