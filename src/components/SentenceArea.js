

import React, { PureComponent } from 'react';
import { View } from 'react-native';
import Sentence from './Sentence';


export default class SentenceArea extends PureComponent {



  render() {
    const {
      sentences,
      onPress,
      onRenderSentence,
    } = this.props;

    return (
      <View style={styles.container}>

        {sentences.map(sentence =>
          <Sentence
            key={sentence.title}
            sentence={sentence}
            onPress={onPress}
            onRender={onRenderSentence}
          />
        )}


      </View>
    );
  }

}

const styles = {
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 5,
    borderWidth: 2,
    paddingBottom: 10,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  add: {
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    paddingHorizontal: 5,
    paddingVertical: 5,
    textDecorationLine: 'underline',
  },
};
