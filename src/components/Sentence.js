import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = {
    container: {
      marginBottom: 8,
      marginRight: 6,
      flexDirection: 'row',
      flexWrap: 'wrap',
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
      fontFamily: 'Avenir',
      fontSize: 15,
      fontWeight: 'normal',
    },
  };
export default class Sentence extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
        this.onPress = this.onPress.bind(this)
        this.onLayout = this.onLayout.bind(this)
        this.onMeasure = this.onMeasure.bind(this)
    }
    
    getSentenceStyle(){
        return {
            ...styles.sentence,
            ...(this.props.sentence.isBeingDragged ? styles.sentenceBeingDragged: {})
        }
    }
    onLayout(){
        this.container && this.container.measure(this.onMeasure)
    }
    onMeasure(x, y, width, height, screenX, screenY){
        //this.props.onRender(this.props.sentence, screenX, screenY, width, height)
    }
    onPress(){
        console.log(this.props)
        this.props.onPress(this.props.sentence)
    }

        

    render(){
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
            <Icon name="ios-close-circle-outline" size={16} color="#FFF" />
                <Text>{' '}</Text>
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
    }
}