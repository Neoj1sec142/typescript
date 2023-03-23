import { client } from '../_services/api'
import {GET_QUERY_FAIL, GET_QUERY_SUCCESS} from '../types'


export const get_query = (query) => async dispatch => {
    try{
        const { loading, error, data } = await client.query({query})
        if(loading){
            console.log(data, "loading-data")
            dispatch({
                type: GET_QUERY_SUCCESS,
                payload: { loading, error, data }
            })
        }else if(error){
            dispatch({
                type: GET_QUERY_FAIL,
                payload: { loading, error }
            })
        }else{
            console.log(data, "data")
            dispatch({
                type: GET_QUERY_SUCCESS,
                payload: { loading, error, data }
            })
        }
    }catch(err){
        dispatch({
            type: GET_QUERY_FAIL,
            payload: { error: err }
        })
    }
}