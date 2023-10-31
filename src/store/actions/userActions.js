import { actionType } from '../../constants/allActions'
import axios from 'axios'


export const fetchUsers = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('http://localhost:3003/user/users', {
                headers: {
                    "env": "test"
                }
            })
            if (data.length > 0) {
                dispatch({
                    type: actionType.FETCH_USERS_DATA,
                    payload: data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}