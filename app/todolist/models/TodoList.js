import Backbone from 'backbone';
import LocalStorage from 'backbone.localstorage';
import TodoModel from './TodoModel';

const TodoList = Backbone.Collection.extend({
	model: TodoModel,
	localStorage: new Backbone.LocalStorage('todo-list-backbone'),
	comparator: 'order',
	nextOrder() {
		return this.length !== 0 ? (this.last().get('order') + 1) : 1;
	},
	getThoseWhich(isCompleted) {
		return this.where({
			isCompleted,
		});
	},
});

export default TodoList;
