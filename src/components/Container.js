
import React, { PureComponent } from 'react';
import {
  LayoutAnimation,
  PanResponder,
  StyleSheet,
  View
} from 'react-native';
import { isPointWithinArea, moveArrayElement } from '../helpers';
import SentenceArea from './SentenceArea';
import { connect } from 'react-redux';
import {setTextArray} from '../Store'

class Container extends PureComponent {


  static defaultProps = {
    animationDuration: 250
  };

  state= {
    sentences: [...this.props.textArray]       
      .map((title) => ({ title })),   
    dndEnabled: true,                       
  };


  componentWillMount() {
    this.panResponder = this.createPanResponder();
  }

  componentWillUpdate() {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: this.props.animationDuration
    });
  }

  createPanResponder = () => PanResponder.create({
    // Handle drag gesture
    onMoveShouldSetPanResponder: (_, gestureState) => this.onMoveShouldSetPanResponder(gestureState),
    onPanResponderGrant: (_, gestureState ) => this.onPanResponderGrant(),
    onPanResponderMove: (_, gestureState ) => this.onPanResponderMove(gestureState),
    // Handle drop gesture
    onPanResponderRelease: (_, gestureState ) => this.onPanResponderEnd(),
    onPanResponderTerminate: (_, gestureState ) => this.onPanResponderEnd(),
  });

  onMoveShouldSetPanResponder = (gestureState) => {
    const { dx, dy, moveX, moveY, numberActiveTouches } = gestureState;

    
    if (numberActiveTouches !== 1) {
      return false;
    }

    if (dx === 0 && dy === 0) {
      return false;
    }

    const sentence = this.findSentenceAtCoordinates(moveX, moveY);
    if (sentence) {
      this.sentenceBeingDragged = sentence;
      return true;
    }

    return false;
  };

  onPanResponderGrant = () => {
    this.updateSentenceState(this.sentenceBeingDragged, { isBeingDragged: true });
  };

  onPanResponderMove = (gestureState) => {
    const { moveX, moveY } = gestureState;
    if (!this.state.dndEnabled) {
      return;
    }
    const draggedOverSentence = this.findSentenceAtCoordinates(moveX, moveY, this.sentenceBeingDragged);
    if (draggedOverSentence) {
      this.swapSentences(this.sentenceBeingDragged, draggedOverSentence);
    }
  };

  onPanResponderEnd = () => {
    this.updateSentenceState(this.sentenceBeingDragged, { isBeingDragged: false });
    this.sentenceBeingDragged = undefined;
    this.props.setTextArray(this.state.sentences)
  };

  enableDndAfterAnimating = () => {
    setTimeout(this.enableDnd, this.props.animationDuration)
  };

  enableDnd = () => {
    this.setState({ dndEnabled: true });
  };

  findSentenceAtCoordinates = (x, y, exceptSentence) => {
    return this.state.sentences.find((sentence) =>
      sentence.tlX && sentence.tlY && sentence.brX && sentence.brY
      && isPointWithinArea(x, y, sentence.tlX, sentence.tlY, sentence.brX, sentence.brY)
      && (!exceptSentence || exceptSentence.title !== sentence.title)
    );
  };

  onPressSentence = (sentence) => {
    // this.setState((state) => {
    //   const index = state.sentences.findIndex(({ title }) => title === sentence.title);
    //   return {
    //     sentences: [
    //       ...state.sentences.slice(0, index),
    //       ...state.sentences.slice(index + 1),
    //     ]
    //   }
    // });
  };

  swapSentences = (draggedSentence, anotherSentence) => {
    this.setState((state) => {
      const draggedSentenceIndex = state.sentences.findIndex(({ title }) => title === draggedSentence.title);
      const anotherSentenceIndex = state.sentences.findIndex(({ title }) => title === anotherSentence.title);
      return {
        sentences: moveArrayElement(
          state.sentences,
          draggedSentenceIndex,
          anotherSentenceIndex,
        ),
        dndEnabled: false,
      }
    }, this.enableDndAfterAnimating);
  };

  updateSentenceState = (sentence, props) => {
    this.setState((state) => {
      const index = state.sentences.findIndex(({ title }) => title === sentence.title);
      return {
        sentences: [
          ...state.sentences.slice(0, index),
          {
            ...state.sentences[index],
            ...props,
          },
          ...state.sentences.slice(index + 1),
        ],
      }
    });
  };

  onRenderSentence = (sentence,
                 screenX,
                 screenY,
                 width,
                 height) => {
    this.updateSentenceState(sentence, {
      tlX: screenX,
      tlY: screenY,
      brX: screenX + width,
      brY: screenY + height,
    });
  };

  // onSubmitNewSentence = (title) => {
  //   const existingSentence = this.state.sentences.find((sentence) => sentence.title === title);
  //   if (existingSentence) {
  //     this.onPressSentence(existingSentence);
  //   }
  //   this.setState((state) => {
  //     return {
  //       sentences: [
  //         ...state.sentences,
  //         { title },
  //       ],
  //     }
  //   });
  // };

  render() {
    const { sentences } = this.state;
    return (
      <View
        style={styles.container}
        {...this.panResponder.panHandlers}
      >

        <SentenceArea
          sentences={sentences}
          onPress={this.onPressSentence}
          onRenderSentence={this.onRenderSentence}
        />

      </View>
    );
  }

}

mapDispatch = (dispatch) => ({
  setTextArray: (ObjArr) =>{
    const textArr = ObjArr.map(obj=>obj.title)
    dispatch(setTextArray(textArr))
  }
})
mapState = (state) =>({
  textArray: state.textArray
})
export default connect(mapState, mapDispatch)(Container)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
