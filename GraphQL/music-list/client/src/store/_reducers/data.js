/* eslint-disable import/no-anonymous-default-export */
import {
    GET_QUERY_SUCCESS, GET_QUERY_FAIL,
    CREATE_MUTATION_SUCCESS, CREATE_MUTATION_FAIL
} from '../types'

const initialState = {
    data: {},
    loading: null,
    error: null
}

export default function(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_QUERY_SUCCESS:
        case CREATE_MUTATION_SUCCESS:
        case GET_QUERY_FAIL:
        case CREATE_MUTATION_FAIL:
            return{
                ...state,
                data: payload.data || null,
                loading: payload.loading || null,
                error: payload.error || null
            }
        default:
            return state
    }
}