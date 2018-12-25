import * as act from './actions';

export  function actAddNewTask(payload) {
    return { type: act.ADD_NEW_TASK, payload };
}
export  function actAddEditedTask(payload) {
    return { type: act.ADD_EDITED_TASK, payload };
}

export  function actDeleteTask(payload) {
    return { type: act.DELETE_TASK, payload };
}

export  function actEditTask(payload) {
    return { type: act.EDIT_TASK, payload };
}

