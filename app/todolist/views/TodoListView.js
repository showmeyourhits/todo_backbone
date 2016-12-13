import _ from 'underscore';
import Backbone from 'backbone';
import TodoView from './TodoView';
import TodoList from './../models/TodoList';
import statsTemp from './../templates/todo_stats.js';


const todoList = new TodoList();
const TodoListView = Backbone.View.extend({
	el: '#app',
	
	events: {
		'keypress #create-new': 'createTodoEntry',
		'click #complete-all': 'completeAll',
		'click #delete-completed': "deleteCompleted",
	},
	initialize() {
		this.listenTo(todoList, 'add', this.addView);
		this.listenTo(todoList, 'add destroy change', this.render);
		this.main = this.$(".todo-main");
		this.stats = this.$(".todo-stats");
		this.all = this.$("#complete-all");
		this.statsTemp = _.template(statsTemp);

		todoList.fetch();
	},

	render(ev) {
		let remaining = todoList.getThoseWhich(false).length;
		this.all[0].checked = remaining === 0;
		if(todoList.length){
			let stats = {
				done: todoList.getThoseWhich(true).length,
				undone: remaining,
			};
			this.all.parent().show();
			this.main.show();
			this.stats.html(this.statsTemp(stats));
			this.stats.show();
		}else{
			this.all.parent().hide();
			this.main.hide();
			this.stats.hide();
		}
	},

	addView(model) {
		const view = new TodoView({
			model,
		});

		view.render();
		this.$('#todo-list').append(view.el);
	},
	createTodoEntry(ev) {
		if (ev.keyCode !== 13 || ev.target.value === '') {

		} else {
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
		todoList.getThoseWhich(true).forEach((model)=>{
			model.destroy();
		});
	}
});

export default TodoListView;
