import React from 'react';
import {  View,  } from 'react-native';
import Sentence from './Sentence'

export default class Document extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    render(){
        console.log('state sentences:', this.state.sentences)
        console.log('props sentences', this.props.sentences)
        return (
            <View
             style={{
                 flexDirection: 'row',
                 flexWrap: 'wrap',
                 borderColor: 'rgba(255,255,255,0.5)',
                 borderRadius: 5,
                 borderWidth: 2,
                 paddingBottom: 10,
                 paddingHorizontal: 15,
                 paddingTop: 15,
        }}
        >
        {this.props.sentences.map( sentence =>( 
            <Sentence key={sentence+`${Math.random()}`} sentence={sentence} onPress={this.props.removeSentence} onRender={this.props.onRenderSentence} />
        ))}
        </View>
    )
    }
}
