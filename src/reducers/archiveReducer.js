
export default function(state = null, action){
    switch(action.type ){
        case 'ARCHIVE': return action.payload;
        default: return state;
    }
}