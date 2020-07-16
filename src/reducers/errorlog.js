
export default function(state = null, action){
    switch(action.type ){
        case 'CLICKED': return action.payload;
        default: return state;
    }
}