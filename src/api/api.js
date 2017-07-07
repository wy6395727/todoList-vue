/**
 *
 * Created by vast on 2017/7/7.
 */
import axios from 'axios'

export const getTodoList=params=>{
	return axios.get('/todo/list',{params})
}

export const addTodo=params=>{
	return axios.post('/todo/addTodo',params)
}
