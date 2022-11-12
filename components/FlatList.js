import React, {Component, createRef} from 'react';
import {View, Image, StyleSheet, Dimensions, FlatList} from 'react-native';

let CurrentSlide = 0;
let IntervalTime = 4000;

export default class Slider extends Component {
  flatList = createRef();

  // TODO _goToNextPage()
  _goToNextPage = () => {
    if (CurrentSlide >= this.state.link.length - 1) {
      CurrentSlide = 0;
    }

    this.flatList.current.scrollToIndex({
      index: ++CurrentSlide,
      animated: true,
    });
  };

  _startAutoPlay = () => {
    this._timerId = setInterval(this._goToNextPage, IntervalTime);
  };

  _stopAutoPlay = () => {
    if (this._timerId) {
      clearInterval(this._timerId);
      this._timerId = null;
    }
  };

  componentDidMount() {
    this._stopAutoPlay();
    this._startAutoPlay();
  }

  componentWillUnmount() {
    this._stopAutoPlay();
  }

  // TODO _renderItem()
  _renderItem({item, index}) {
    return <Image source={{uri: item}} style={styles.sliderItems} />;
  }

  // TODO _keyExtractor()
  _keyExtractor(item, index) {
    // console.log(item);
    return index.toString();
  }
  state = {
    link: [
      'https://image.shutterstock.com/image-vector/online-exam-computer-web-app-260nw-1105800884.jpg',
      'https://image.shutterstock.com/image-vector/online-exam-computer-web-app-260nw-1105800884.jpg',
      //   'https://picsum.photos/200/300',
      'https://image.shutterstock.com/image-vector/online-exam-computer-web-app-260nw-1105800884.jpg',
      'https://image.shutterstock.com/image-vector/online-exam-computer-web-app-260nw-1105800884.jpg',
    ],
  };

  render() {
    return (
      <View style={{marginTop: 10, marginBottom: 10}}>
        <FlatList
          style={{
            flex: 1,
            // TODO Remove extera global padding
            // marginLeft: -size.padding,
            // marginRight: -size.padding,
          }}
          data={this.state.link}
          keyExtractor={this._keyExtractor.bind(this)}
          renderItem={this._renderItem.bind(this)}
          horizontal={true}
          flatListRef={React.createRef()}
          ref={this.flatList}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sliderItems: {
    marginLeft: 5,
    marginRight: 5,
    height: 200,
    width: Dimensions.get('window').width,
  },
});
