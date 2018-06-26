import React, {Component} from 'react'
import {View, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {setText, setTextArray} from '../Store';
  



class Document extends Component{
    constructor(){
        super()
        this.handleChange = this.handleChange.bind(this)
        this.splitEachSentence =this.splitEachSentence.bind(this)
    }
    
    splitEachSentence(string){
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

    handleChange(text){
        this.props.setText(text)
        this.props.setTextArray(this.splitEachSentence(text))    
    }



    render(){
        return (
            <View
            behavior="padding" 
            enabled
            style={{
            // backgroundColor:'#8f5',
            flex:1,  
            paddingHorizontal: 15      
            }}
            >
                <TextInput
                onChangeText={this.handleChange}
                placeholder='type here'
                value = {this.props.text}
                multiline={true}
                numberOfLines={100}
                disableFullscreenUI={false}
                autoFocus={true}
                style={{fontSize:20}}
                
                />
            </View>
        )
    }
}
const mapState = state =>({
    text: state.text,
    textArray: state.textArray
})
const mapDispatch = dispatch =>({
    setText:(text)=>{
        dispatch(setText(text))
    },
    setTextArray:(textArray)=>{
        dispatch(setTextArray(textArray))
    },
})
export default connect(mapState, mapDispatch)(Document)