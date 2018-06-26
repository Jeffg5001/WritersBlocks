import React, {Component} from 'react'
import {KeyboardAvoidingView, Button} from 'react-native';
import {connect} from 'react-redux';
import {setText, setTextArray} from '../Store'
  



class Buttons extends Component{
    constructor(){
        super()
        this.state ={
            rearrange: false,
        } 
        this.placeTextOnState = this.placeTextOnState.bind(this)
    }

    placeTextOnState(e){
       this.setState({rearrange: false})
       this.props.setText(this.props.textArray.join(' '))
       this.props.handleEditPress(e)
    }

    render(){
       return  <KeyboardAvoidingView
        behavior="padding" 
        enabled
        >
        {this.state.rearrange ? 
          <Button 
          title='Edit'
          onPress = {this.placeTextOnState}
          />:
          <Button 
          title='Rearrange'
          onPress = {evt =>{
              this.props.handleRearrangePress()
              this.setState({rearrange: true})}}
          />
        }
        </KeyboardAvoidingView>
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
export default connect(mapState, mapDispatch)(Buttons)