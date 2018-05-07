import {SAVE_BASIC_SUREVY} from '../actions/actionsAll';

const initialState = {

}

const all = (state = initialState, action) => {
    switch (action.type) {
       case SAVE_BASIC_SUREVY :
            state = {
                surveyData: action.obj
            };
            return state;
       default: // need this for default case
            return state
    }
};

export default all;