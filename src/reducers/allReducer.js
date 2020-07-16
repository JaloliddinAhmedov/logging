
export default function(state = null, action){
    switch(action.type ){
        case 'ALL': return action.payload;
        default: return state;
    }
}