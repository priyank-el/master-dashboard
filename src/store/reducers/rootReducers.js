import { combineReducers } from 'redux'
import userReducer from './userReducers'
import categoryReducer from './categoryReducer'
import { loadingReducer } from './loadingReducer'
import { brandReducer } from './brandReducer'
import { productReducer } from './productReducer'

const rootReducer = combineReducers({
    users: userReducer,
    category: categoryReducer,
    brand: brandReducer,
    loading: loadingReducer,
    products: productReducer
})

export default rootReducer