import { configureStore } from "@reduxjs/toolkit";
import packageReducer from './features/packageSlice'

const store = configureStore({
    reducer: {
        packages: packageReducer
    }
})

export default store