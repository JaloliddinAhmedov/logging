
export default function(state = null, action){
    switch(action.type ){
        case 'PROCESSING': return action.payload;
        default: return state;
    }
}