import { client } from '../_services/api'
import {
    GET_QUERY_FAIL, GET_QUERY_SUCCESS,
    CREATE_MUTATION_SUCCESS, CREATE_MUTATION_FAIL
} from '../types'


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

export const create_mutation = (mutation, variables) => async dispatch => {
    try{
        const {data} = await client.mutate({ mutation, variables })
        console.log(data, "data")
        dispatch({
            type: CREATE_MUTATION_SUCCESS,
            payload: data
        })
    }catch(err){
        console.log(err.message, "Err 2")
        dispatch({
            type: CREATE_MUTATION_FAIL
        })
    }
}