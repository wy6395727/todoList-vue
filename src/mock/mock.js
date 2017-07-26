/**
 * Created by vast on 2017/7/7.
 */
import axios from 'axios'
import Mock from 'mockjs'
import MockAdapter from 'axios-mock-adapter'
import {
	Todos
} from './data/todoList'

export default {
	start(){
		let mock = new MockAdapter(axios)

		// todo列表
		mock.onGet('/todo/list').reply(config=> {
			let mockTodos = Todos.map((todo)=> {
				return {
					id:todo.id,
					title:todo.title,
					count:todo.record.filter((item)=>{
						if(item.checked) return false
						return true
					}).length,
					locked:todo.locked,
					isDelete:todo.isDelete
				}
			})
			return new Promise((resolve,reject)=>{
				setTimeout(()=>{
					resolve([200,{
						todos:mockTodos
					}])
				},200)
			})
		})

		// 新增一条todo
		mock.onPost('/todo/addTodo').reply(config=>{
			Todos.push({
				id:Mock.Random.guid(),
				title:"newList",
				locked:false,
				isDelete:false,
				record:[]
			});
			return new Promise((resolve,reject)=>{
				setTimeout(()=>{
					resolve([200])
				},200)
			})
		})

		//获取todo单项
		mock.onGet('/todo/getTodo').reply(config=>{
			let todoitem={}
			Todos.forEach((todo)=>{
				if(todo.id===config.id){
					todoitem=todo
				}
			})

			return new Promise((resolve,reject)=>{
				setTimeout(()=>{
					resolve([200,{
						todo:todoitem,
					}])
				})
			})
		})
		//增加 单项
		mock.onPost('/todo/addItem').reply(config=>{
			let todo={}
			let {id,text}=JSON.parse(config.data)
			Todos.forEach((item)=>{
				if(item.id===id){
					todo=item
				}
			})
			todo.record.push({
				text:text,
				isDelete:false,
				checked:false
			})

			return new Promise((resolve,reject)=>{
				setTimeout(()=>{
					resolve([200])
				})
			})
		})
		//锁切换
		mock.onGet('/todo/changelock').reply(config=>{
			let todo={}
			Todos.forEach((item)=>{
				if(item.id===config.params.id){
					todo=item
				}
			})
			todo.locked=!todo.locked

			return new Promise((resolve,reject)=>{
				setTimeout(()=>{
					resolve([200])
				})
			})
		})
		//改title
		mock.onGet('/todo/changetitle').reply(config=>{
			Todos.forEach((item)=>{
				if(item.id===config.params.id){
					item.title=config.params.title
				}
			})

			return new Promise((resolve,reject)=>{
				setTimeout(()=>{
					resolve([200])
				})
			})
		})
		//删除todo
		mock.onGet('/todo/deletetodo').reply(config=>{
			Todos.forEach((item,index)=>{
				if(item.id===config.params.id){
					Todos.splice(index,1)
				}
			})

			return new Promise((resolve,reject)=>{
				setTimeout(()=>{
					resolve([200])
				})
			})
		})
		//删除todo下item
		mock.onGet('/todo/deletetodoitem').reply(config=>{
			Todos.forEach((todo,index)=>{
				if(todo.id===config.params.id){
					Todos[index].record.splice(config.params.index,1)
				}
			})

			return new Promise((resolve,reject)=>{
				setTimeout(()=>{
					resolve([200])
				})
			})
		})
		//changeitem
		mock.onGet('/todo/changeitem').reply((config)=>{
			Todos.forEach((todo,index)=>{
				if(todo.id===config.params.id){
					Todos[index].record[config.params.index]=config.params.todoitem
				}
			})

			return new Promise((resolve,reject)=>{
				setTimeout(()=>{
					resolve([200])
				})
			})
		})
	}
}
