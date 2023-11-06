import { combineReducers } from 'redux'
import userReducer from './userReducers'
import categoryReducer from './categoryReducer'
import { loadingReducer } from './loadingReducer'
import { brandReducer } from './brandReducer'

const rootReducer = combineReducers({
    users: userReducer,
    category: categoryReducer,
    brand: brandReducer,
    loading: loadingReducer
})

export default rootReducer