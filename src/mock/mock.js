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
		mock.onGet('/todo/list').reply(config=> {
			let mockTodos = Todos.map(todo=> {
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
	}
}
