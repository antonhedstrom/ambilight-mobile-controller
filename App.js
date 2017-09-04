import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { GET, POST } from './helpers/http-requests';

import Topbar from './components/topbar';
import LightList from './components/light-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lights: []
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    const url = 'https://facebook.github.io/react-native/movies.json';
    GET(url).then(data => {
      let movies = data.movies || [];
      movies = movies.map(movie => {
        movie.key = Math.random(0,3);
        return movie;
      });
      this.setState({lights: movies});
    })
  }
  render() {
    console.log("this.state.lights", this.state.lights);
    return (
      <View style={styles.layout}>
        <Topbar />
        <View style={{flex: 2, backgroundColor: 'skyblue'}}>
          <LightList lights={this.state.lights} />
        </View>
        <View style={{flex: 3, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1
  },
  box: {
    flex: 1,
    height: 150,
    width: 150
  }
});
