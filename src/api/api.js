/**
 *
 * Created by vast on 2017/7/7.
 */
import axios from 'axios'

export const getTodoList = ()=> {
	return axios.get('/todo/list')
}

export const addTodo = ()=> {
	return axios.post('/todo/addTodo')
}

export const getTodo = params=> {
	return axios.get('/todo/getTodo', params)
}
export const addTodoItem = (todoid, text)=> {
	return axios.post('/todo/addItem', {
		id: todoid,
		text: text
	})
}

export const changelock = (todoid)=> {
	return axios.get('/todo/changelock',{params:{id:todoid}})
}

//删除todo
export const deleteTodo = (id)=>{
	return axios.get('/todo/deletetodo',{
		params:{id:id}
	})
}
//删除todoitem
export const deleteTodoItem=(id,index)=>{
	return axios.get('/todo/deletetodoitem',{
		params:{id:id,index:index}
	})
}
export const changetitle=(id,title)=>{
	return axios.get('/todo/changetitle',{
		params:{
			id,
			title
		}
	})
}
export const changeItem=(id,index,todoitem)=>{
	return axios.get('todo/changeitem',{
		params:{
			id,
			index,
			todoitem
		}
	})
}
