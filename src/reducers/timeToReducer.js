
export default function(state = null, action){
    switch(action.type ){
        case 'TIMETO': return action.payload;
        default: return state;
    }
}