const DRAWER_DATA = 'DRAWER_DATA';

const initialState =
{
    type: 'data',
    data: null
}

export const drawerReducer = ( state = initialState, action ) => {
    switch (action.type)
    {
        case DRAWER_DATA:
            return action.payload;
        default:
            return state;
    }
}

export const setdrawerData = (payload) => {
    console.log(payload)
return({
    type: DRAWER_DATA,
    payload,
})}