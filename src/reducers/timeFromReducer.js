
export default function(state = null, action){
    switch(action.type ){
        case 'TIMEFROM': return action.payload;
        default: return state;
    }
}