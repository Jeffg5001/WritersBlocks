// @flow

import React, { PureComponent } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Tags from './src/components/Container';
import {Provider} from 'react-redux';
import store from './src/Store/index';
import Document from './src/components/Document';
import Buttons from './src/components/Buttons'





export default class Main extends PureComponent {

  state = {

    rearrange: false
  };


  handleRearrangePress = (e) => {
    this.setState({rearrange: true})
  }

  handleEditPress = (e) => {
    this.setState({rearrange: false})
  }

  render() {
    return (
      <Provider store={store}>
      <View style={styles.container}>
        <StatusBar hidden={true} />


        <View style={styles.header}>
          <Text style={[styles.text, styles.title]}>
            Let's drag and drop some sentences!
          </Text>
          <Text style={styles.text}>
            Drag and drop sentences to reorder, tap to remove or press Add New to add new sentences.
          </Text>
        </View>
        { this.state.rearrange ?
          <Tags
          ref={component => this._sentencesComponent = component }
        />
              :
              <Document />
            }
        <Buttons handleEditPress={this.handleEditPress} handleRearrangePress={this.handleRearrangePress} />
        

      </View>
      </Provider>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2196F3',
  },
  header: {
    marginHorizontal: 20,
    marginVertical: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});
