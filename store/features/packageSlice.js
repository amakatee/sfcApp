import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    orders: [],
    items: [
        {
            id: 1,
            recipient:'Natalia Petrove',
            domesticCode: '12345678',
            info: 'clothing',
            type: 'EMS',
            weight: '2.4kg',
            billing: '35$',
            internationalCode:'EV1287302K'
        }
    ]

    
}
const packageSlice = createSlice({
    name:'packages',
    initialState,
    reducers: {

    }
        
})
export const allPackages = state => state.packages.items

export default packageSlice.reducer