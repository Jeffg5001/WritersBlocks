import React from 'react';
import { StyleSheet, TextInput, Text, Button, View, Animated, PanResponder, LayoutAnimation, StatusBar } from 'react-native';
import Sentence from './src/components/Sentence'

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      text:'',
      rearrange:false,
      textArr:[],
    }
    this.removeSentence = this.removeSentence.bind(this)
    // this.onRenderSentence = this.onRenderSentence.bind(this)
    // this.updateTextState = this.updateTextState.bind(this)
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
  // updateTextState(sentenceObj, props){
  //   this.setState((state)=>{
      
  //     const index = state.textArr.findIndex(title =>{
  //       return title.title === sentenceObj.title
  //     });
      
  //     return {
  //       textArr: [...state.textArr.slice(0,index), {
  //         ...state.textArr[index], 
  //         ...props
  //       },
  //       ...state.textArr.slice(index + 1),
  //       ]
  //     }
  //   })
  // }
  // onRenderSentence(sentenceObj, screenX, screenY, width, height){

  //   this.updateTextState(sentenceObj, {tlX:screenX, tlY:screenY, brX:screenX + width, brY: screenY + height})
  // }

  onMoveShouldSetPanResponder = (gestureState) => {
    
    return true;
  };

  onPanResponderGrant(){
    
  }
  removeSentence(sentence){
    
    this.setState((state) => {
      const index = state.textArr.findIndex((text) => text.title === sentence.title);
      return {
        textArr: [
          // Remove the tag
          ...state.textArr.slice(0, index),
          ...state.textArr.slice(index + 1),
        ]
      }
    });
  };
  onPanResponderMove(gestureState){
    const {moveX, moveY} = gestureState;
    

  }
  onPanResponderEnd() {
    
  };
  static defaultProps = {
    animationDuration: 250
  };
  render() {
    
    return (
      <View style={styles.container}>
      <StatusBar hidden={true} />
        <Button 
        title='Edit'
        disabled = {!this.state.rearrange}
        onPress = {evt =>this.setState({rearrange: false, text: this.state.textArr.map(sentenceObj=>sentenceObj.title).join('.')})}
        />
        <Button 
        title='Rearrange'
        disabled = {this.state.rearrange}
        onPress = {evt =>this.setState({rearrange: true})}
        />
      { this.state.rearrange ?
        this.state.textArr.map( sentence =>( 
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
          <View key={sentence+'view'+`${Math.random()}`}
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
          {...this.panResponder.panHandlers}
          >
          <Sentence  sentence={{ title:sentence.title }} onPress={this.removeSentence}  />
          </View>))
        :
        <TextInput
          onChangeText={text =>this.setState({text, textArr:text.split('.').map(title => ({title}))})}
          placeholder='type here'
          value = {this.state.text}
          multiline={true}
          
        />}
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
