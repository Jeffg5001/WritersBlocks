import React from 'react';
import { View, TextInput, Button, KeyboardAvoidingView, StatusBar, StyleSheet } from 'react-native';
import Container from './src/components/Container';

function splitEachSentence(string){
  // const result = [];
  // let currentSentence = '';
  // for( letter of string){
  //   currentSentence += letter
  //   if(/\?|\.|\!/.test(letter)){
  //     result.push(currentSentence)
  //     currentSentence=''
  //   }
    
  // }
  // if(currentSentence) result.push(currentSentence);
  return string.replace(/(\.+|\:|\!|\?)(\"*|\'*|\)*|}*|]*)(\s|\n|\r|\r\n)/gm, "$1$2|").split("|")
}

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      rearrange:false,
      textArr:[],
      text:'',
    }
    
  }
  
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        { this.state.rearrange ?
          <Container sentences={this.state.textArr}/>
              :
              <KeyboardAvoidingView
              behavior="padding" 
              enabled
              style={{
                backgroundColor:'#8f5',
                flex:2,        
              }}
              >
              <TextInput
              onChangeText={text =>this.setState((state)=>{

                  return {text, textArr:splitEachSentence(text)}

                })}
              placeholder='type here'
              value = {this.state.text}
              multiline={true}
              numberOfLines={100}
              disableFullscreenUI={false}
              autoFocus={true}
              />
              </KeyboardAvoidingView>
            }
        <KeyboardAvoidingView
              behavior="padding" 
              enabled
              >
              {this.state.rearrange ? 
                <Button 
                title='Edit'
                onPress = {evt =>this.setState({rearrange: false, text: this.state.textArr.join(' ')})}
                />:
                <Button 
                title='Rearrange'
                onPress = {evt =>this.setState({rearrange: true})}
                />
              }
              </KeyboardAvoidingView>
      </View>
    );
  }
};
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