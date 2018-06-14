import React from 'react';
import { StyleSheet, View, PanResponder, LayoutAnimation } from 'react-native';
import Document from './Document';
import { isPointWithinArea, moveArrayElement } from '../helper';



  export default class Container extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        dndEnabled: true,
        sentences: this.props.sentences.map(text =>({title:text}))
      }
      this.removeSentence = this.removeSentence.bind(this)
      this.onRenderSentence = this.onRenderSentence.bind(this)
      this.updateTextState = this.updateTextState.bind(this)
      this.findSentenceAtCoordinates = this.findSentenceAtCoordinates.bind(this)
    }
    componentWillMount(){
      this.panResponder = this.createPanResponder(PanResponder)
    }
  
    componentWillUpdate() {
      LayoutAnimation.configureNext({
        ...LayoutAnimation.Presets.easeInEaseOut,
        duration: this.props.animationDuration
      });
    }
  
    createPanResponder(PanResponder){
     return PanResponder.create({
        // Handle drag gesture
      onMoveShouldSetPanResponder: (_, gestureState) => this.onMoveShouldSetPanResponder(gestureState),
      onPanResponderGrant: (_, gestureState) => this.onPanResponderGrant(),
      onPanResponderMove: (_, gestureState) => this.onPanResponderMove(gestureState),
      // Handle drop gesture
      onPanResponderRelease: (_, gestureState) => this.onPanResponderEnd(),
      onPanResponderTerminate: (_, gestureState) => this.onPanResponderEnd(),
    
      })
    }
  
    

  
    updateTextState(sentenceObj, props){
      this.setState((state)=>{
        
        const index = state.sentences.findIndex(sentence =>{
          return sentence.title === sentenceObj.title
        });
        
        return {
          sentences: [...state.sentences.slice(0,index), {
            ...state.sentences[index], 
            ...props
          },
          ...state.sentences.slice(index + 1),
          ]
        }
      })
    }
    onRenderSentence(sentenceObj, screenX, screenY, width, height){
  
      this.updateTextState(sentenceObj, {tlX:screenX, tlY:screenY, brX:screenX + width, brY: screenY + height})
    }
  
    onMoveShouldSetPanResponder = (gestureState) => {
        const { dx, dy, moveX, moveY, numberActiveTouches } = gestureState;

        if(numberActiveTouches !== 1){
            return false
        }
        if(dx === 0 && dy === 0){
            return false
        }
        const sentence = this.findSentenceAtCoordinates(moveX, moveY);
        if(sentence){
            this.sentenceBeingDragged = sentence;
            return true
        }
      return false;
    };
  
    onPanResponderGrant(){
      this.updateTextState(this.sentenceBeingDragged, {isBeingDragged: true})
    }

    removeSentence(sentence){
      
      this.setState((state) => {
        const index = state.sentences.findIndex((text) => text.title === sentence.title);
        return {
          sentences: [
            // Remove the tag
            ...state.sentences.slice(0, index),
            ...state.sentences.slice(index + 1),
          ]
        }
      });
    };
    onPanResponderMove(gestureState){
        const {moveX, moveY} = gestureState;
        console.log('onPanResponderMove: ', moveX, moveY);
      if(!this.state.dndEnabled){
          return;
      }
      const draggedOverSentence = this.findSentenceAtCoordinates(moveX, moveY, this.sentenceBeingDragged)
      if(draggedOverSentence){
          this.swapSentences(this.sentenceBeingDragged, draggedOverSentence)
      }
  
    }
    onPanResponderEnd() {
      this.updateTextState(this.sentenceBeingDragged, {isBeingDragged: false})
      this.sentenceBeingDragged = undefined;
    };

    findSentenceAtCoordinates(x, y, exceptText){
        return this.state.sentences.find((text) => {
            return text.tlX && text.tlY && text.brX && text.brY
            && isPointWithinArea(x, y, text.tlX, text.tlY, text.brX, text.brY)
            && (!exceptText || exceptText.title !== text.title)
          
        })
    }

    static defaultProps = {
      animationDuration: 250
    };

    enableDndAfterAnimating(){
        setTimeout(this.enabelDnd, this.props.animationDuration)
    }
    enableDnd(){
        this.setState({dndEnabled:true})
    }
    swapSentences(draggedSentence, anotherSentence){
        this.setState((state)=>{
            const draggedSentenceIndex = state.sentences.findIndex((sentence)=>sentence.title === draggedSentence.title)
            const anotherSentenceIndex = state.sentences.findIndex((sentence)=>sentence.title === anotherSentence.title)
            return {
                sentences: moveArrayElement(state.sentences,draggedSentenceIndex, anotherSentenceIndex),
                dndEnabled: false
            }
        }, this.enableDndAfterAnimating)
    }
    render() {
      // <View
      // onResponderMove={this.handleResponderMove}
      // onMoveShouldSetResponder={(evt)=>true}
      // onResponderGrant={(evt)=>{
        // }}
        // key={sentence+'view'+`${Math.random()}`}
        // >
        //   <Text 
        //     selectable={false}
        //     key={sentence+`${Math.random()}`}
        //   >
        //   {sentence}
        //   </Text>
        // </View>)
      console.log(this.state)
      return (
        <View style={styles.container}
        style={{
          backgroundColor:'#8f5',
          flex:2,        
        }
        }
        {...this.panResponder.panHandlers}
        >
          <Document 
            sentences={this.state.sentences} 
            removeSentence={this.removeSentence}
            onRenderSentence={this.onRenderSentence}
            />
              </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexWrap: 'wrap',
      backgroundColor: '#7f4',
      paddingVertical: 35,
      // top:31,
      // alignItems: 'center',
      // justifyContent: 'center',
      paddingHorizontal: 15
    },
  });
  