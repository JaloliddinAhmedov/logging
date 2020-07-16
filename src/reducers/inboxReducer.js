
export default function(state = null, action){
    switch(action.type ){
        case 'INBOX': return action.payload;
        default: return state;
    }
}