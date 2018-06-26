
import React, { PureComponent } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';



export default class Sentence extends PureComponent {

 
  // Append styles.sentenceBeingDragged style if sentence is being dragged
  getSentenceStyle = ()=> ({
    ...styles.sentence,
    ...(this.props.sentence.isBeingDragged ? styles.sentenceBeingDragged : {}),
  });

  // Call view container's measure function to measure sentence position on the screen
  onLayout = () => {
    this.container && this.container.measure(this.onMeasure);
  };

  // Pass sentence coordinates up to the parent component
  onMeasure = (x,
               y,
               width,
               height,
               screenX,
               screenY) => {
    this.props.onRender(this.props.sentence, screenX, screenY, width, height);
  };

  // Handle sentence taps
  onPress = () => {
    this.props.onPress(this.props.sentence);
  };

  render() {
    const { sentence: { title } } = this.props;
    return (
      <View
        ref={el => this.container = el}
        style={styles.container}
        onLayout={this.onLayout}
      >
        <TouchableOpacity
          style={this.getSentenceStyle()}
          onPress={this.onPress}
        >
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = {
  container: {
    marginBottom: 8,
    marginRight: 6,
  },
  sentence: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .33)',
    borderColor: 'rgba(255, 255, 255, .25)',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  sentenceBeingDragged: {
    backgroundColor: 'rgba(255, 255, 255, .01)',
    borderStyle: 'dashed',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'normal',
  },
};
