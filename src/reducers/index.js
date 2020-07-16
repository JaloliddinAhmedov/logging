import datas from './errorlog';
import inbox from './inboxReducer';
import archive from './archiveReducer';
import processing from './processingReducer';
import all from './allReducer';
import time from './timeReducer';
import timeFrom from './timeFromReducer';
import timeTo from './timeToReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    datas :datas,
    inbox: inbox,
    archive: archive,
    processing: processing,
    all: all,
    time: time,
    timeFrom: timeFrom,
    timeTo: timeTo

})

export default rootReducer;