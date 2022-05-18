import {createSlice} from '@reduxjs/toolkit'




const initialState = {
    orders: [
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
        
    ],
    totalQuantity:0 ,
    items: [
        {
            id: 2,
            recipient:'Natalia Pevsdstrove',
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
        addToCart: (state, action) => {
            const newItem = action.payload
            console.log(newItem)
            const existingItem = state.orders.find(product => product.id === newItem.id)
            if(existingItem){
                alert('Package aready exists!')
                return
            }else {
                state.orders.push({
                    id:newItem.id,
                    domesticCode: newItem.track,
                    info: newItem.info
                })
                state.totalQuantity++
            }

        }

    }
        
})
export const allPackages = state => state.packages.orders
export const totalPackages = state => state.packages.totalQuantity

export const {addToCart} = packageSlice.actions
export default packageSlice.reducer
