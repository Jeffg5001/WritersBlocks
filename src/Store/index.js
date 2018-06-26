import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createLogger} from 'redux-logger';
//action types
const SET_TEXT = 'SET_TEXT';
const SET_TEXT_ARRAY = 'SET_TEXT_ARRAY';

//action creator
export const setText = (text) =>({
    type:SET_TEXT,
    text
})

export const setTextArray = (textArray) =>({
    type: SET_TEXT_ARRAY,
    textArray
})

const reducer = (state = {text:'', textArray:[]}, action) =>{
    switch(action.type){
        case SET_TEXT:
            return {...state, text: action.text}
        case SET_TEXT_ARRAY:
            return {...state, textArray: [...action.textArray]}
        default:
            return state
    }
}
export default store = createStore(reducer, composeWithDevTools(applyMiddleware(createLogger({collapsed: true}))))