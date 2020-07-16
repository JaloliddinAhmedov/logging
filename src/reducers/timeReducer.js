export default function(state = null, action){
    switch(action.type ){
        case 'TIME': return {
            timeFrom : action.timeFrom,
            timeTo : action.timeTo
        };
        default: return state;
    }
}