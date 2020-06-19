const DRAWER_DATA   = 'DRAWER_DATA';
const CLOSR_DRAWER  = 'CLOSR_DRAWER';

const startStates = 
{
    type: 'data',
    data: null      
}

export const DrawerReduce = ( state = startStates, action ) => 
{
    switch(action.type)
    {
        case DRAWER_DATA: 
            return action.payload
        case CLOSR_DRAWER:
            return {...startStates}
        default: 
            return state;
    }
}

export const setDrawerData = (payload) =>{
    console.log('555')
    return( 
{
    type: DRAWER_DATA,
    payload
})}

export const setDrawerClose = () =>
({
    type: CLOSR_DRAWER,
})