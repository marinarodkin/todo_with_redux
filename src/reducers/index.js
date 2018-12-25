import { combineReducers } from 'redux';
//import { routerReducer, push } from 'react-router-reducers';
import * as act from './actions'; // CONSTANTS FROM ACTIONS
import uuidv4 from 'uuid/v4';


const initialApp = {
    tasks: [{content: 'Read 30 pages from the book', done: false, index: 1, id: uuidv4()},
        {content: 'Write a letter', done: false, index: 2, id: uuidv4()},
        {content: 'Prepare for tomorrow', done: true, index: 3, id: uuidv4()}
    ],
        text: '',
    currentIndex: 3
};


function rdcApp(state = initialApp, action) {
    switch (action.type) {
        case act.ADD_NEW_TASK:
            return {...state }
        case act.ADD_EDITED_TASK:
            return {...state }
        case act.DELETE_TASK:

            return {...state,  }

        case act.EDIT_TASK:
            return {...state, }


        default:
            return state
    }
}

const rootReducer = combineReducers({
    app: rdcApp,
});

export default rootReducer;
