import { client } from '../_services/api'
import {GET_QUERY_FAIL, GET_QUERY_SUCCESS} from '../types'


export const get_query = (query, variables) => async dispatch => {
    try{
        console.log(query)
        const { loading, error, data } = await client.query({
            query,
            variables
        })
        if(!error){
            console.log(data, "data")
            dispatch({
                type: GET_QUERY_SUCCESS,
                payload: { loading, error, data }
            })
        }else{
            console.log(error, "error")
            dispatch({
                type: GET_QUERY_FAIL,
                payload: { error }
            })
        }
    }catch(err){
        dispatch({
            type: GET_QUERY_FAIL,
            payload: { error: err }
        })
    }
}