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
    if(action.type === 'UPDATE_SKILL'){
        return state.map(skill => skill.id === action.skill.id ? action.skill : skill);
    }
    return state;
}

const clientSkillsReducer = (state = [], action) => {
    if(action.type === 'LOAD_CLIENT_SKILLS'){
        return action.clientSkills
    }
    if(action.type === 'CREATE_CLIENT_SKILL'){
        return [...state, action.clientSkill]
    }
    if(action.type === 'DELETE_CLIENT_SKILL'){
        return state.filter(clientSkill => clientSkill.id !== action.clientSkill.id);
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

export const save = (skill, history) =>{
    return async(dispatch) =>{
        skill = (await axios.put(`/api/skills/${skill.id}`, skill)).data
        dispatch({type: 'UPDATE_SKILL', skill});
        history.push('/');
    }
}

export const createClientSkill = (clientSkill) =>{
    return async(dispatch) =>{
        clientSkill = (await axios.post('/api/clientSkills', clientSkill)).data
        dispatch({type: 'CREATE_CLIENT_SKILL', clientSkill});
    }
}

export const deleteClientSkill = (clientSkill) =>{
    return async(dispatch) =>{
        await axios.delete(`/api/clientSkills/${clientSkill.id}`)
        dispatch({type:'DELETE_CLIENT_SKILL', clientSkill})
    }
}

export const fetchClientSkills = () =>{
    return async(dispatch) =>{
        const clientSkills = (await axios.get('/api/clientSkills')).data;
        dispatch({type: 'LOAD_CLIENT_SKILLS', clientSkills})
    }
}

export default store;