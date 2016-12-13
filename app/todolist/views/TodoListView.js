import _ from 'underscore';
import Backbone from 'backbone';
import TodoView from './TodoView';
import TodoList from './../models/TodoList';
import statsTemp from './../templates/todo_stats.js';


const todoList = new TodoList();
export default Backbone.View.extend({
	el: '#app',
	events: {
		'keypress #create-new': 'createTodoEntry',
		'click #complete-all': 'completeAll',
		'click #delete-completed': 'deleteCompleted',
	},
	initialize() {
		this.listenTo(todoList, 'add destroy change:isCompleted', this.render);
		this.listenToOnce(todoList, 'sync', this.renderList);
		this.main = this.$('.todo-app__main');
		this.stats = this.$('.todo-app__stats');
		this.all = this.$('#complete-all');
		this.statsTemp = _.template(statsTemp);

		todoList.fetch();
	},

	render() {
		const remaining = todoList.filterCompleted(false).length;
		this.all[0].checked = remaining === 0;
		if (todoList.length) {
			const stats = {
				done: todoList.filterCompleted(true).length,
				undone: remaining,
			};
			this.all.parent().show();
			this.main.show();
			this.stats.html(this.statsTemp(stats));
			this.stats.show();
		} else {
			this.all.parent().hide();
			this.main.hide();
			this.stats.hide();
		}
	},
	renderList() {
		console.log('rendering full list');
		todoList.forEach((model) => {
			this.addView(model);
		});
		this.listenTo(todoList, 'add', this.addView);
	},
	addView(model) {
		const view = new TodoView({
			model,
		});

		this.$('#todo-list').append(view.render().el);
	},
	createTodoEntry(ev) {
		if (ev.keyCode === 13 && ev.target.value !== '') {
			todoList.create({
				title: ev.target.value,
				order: todoList.nextOrder(),
			});
			ev.target.value = '';
		}
	},
	completeAll(ev) {
		const isCompleted = ev.target.checked;
		todoList.forEach((model) => {
			model.save({
				isCompleted,
			});
		});
	},
	deleteCompleted() {
		_.invoke(todoList.filterCompleted(true), "destroy");
	},
});
