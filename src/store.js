import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios'

const clientsReducer = (state = [], action) =>{
    if(action.type === 'LOAD_CLIENTS'){
        return action.clients
    }
    return state;
}

const skillsReducer = (state = [], action) => {
    if(action.type === 'LOAD_SKILLS'){
        return action.skills
    }
    return state;
}

const clientSkillsReducer = (state = [], action) => {
    if(action.type === 'LOAD_CLIENT_SKILLS'){
        return action.clientSkills
    }
    return state;
}

const reducer = combineReducers({
    clients: clientsReducer,
    skills: skillsReducer,
    clientSkills: clientSkillsReducer
})

const store = createStore(reducer, applyMiddleware(thunk, logger));

export const fetchClients = () =>{
    return async(dispatch) =>{
        const clients = (await axios.get('/api/clients')).data;
        dispatch({type: 'LOAD_CLIENTS', clients})
    }
}

export const fetchSkills = () =>{
    return async(dispatch) =>{
        const skills = (await axios.get('/api/skills')).data;
        dispatch({type: 'LOAD_SKILLS', skills})
    }
}

export const fetchClientSkills = () =>{
    return async(dispatch) =>{
        const clientSkills = (await axios.get('/api/clientSkills')).data;
        dispatch({type: 'LOAD_CLIENT_SKILLS', clientSkills})
    }
}

export default store;