/**
 * Created by vast on 2017/7/11.
 */
import Vuex from 'vuex'
import Vue from 'vue'

import {getTodoList,addTodo} from '../api/api'

Vue.use(Vuex)

const state={
	todoList:[],
	activeId:"",
}

const mutations={
	GETTODOS(state,data){
		state.todoList=data
	},
	CHANGID(state,id){
		state.activeId=id
	},
	CHANGLOCK(state,id){
		state.todoList.forEach((todo,index)=>{
			if(todo.id===id) state.todoList[index].locked=!state.todoList[index].locked
		})
	}
}

const actions={
	getTodos({commit,state},payload){
		return new Promise((resolve,reject)=>{
			getTodoList().then((res)=>{
				commit('GETTODOS',res.data.todos)
				resolve(state.todoList)
			})
		})
	},
	addTodo({commit,state},payload){
		return new Promise((resolve,reject)=>{
			addTodo()
			resolve()
		})
	},
}

export default new Vuex.Store({
	state,
	mutations,
	actions
})
