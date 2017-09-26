import React from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';

import LightListItem from './light-list-item';
import LightListSeparator from './light-list-separator';

export default class LightList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }
  renderListItem = ({item}) => {
    return <LightListItem
      item={item}
      navigation={this.props.navigation}
    />;
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
