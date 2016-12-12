import _ from 'underscore';
import viewTemp from './../templates/todoview.js';

const TodoView = Backbone.View.extend({
	tagName: 'li',
	className: 'todo-view',
	events: {
		'dblclick': 'startEditTitle',
		'keypress .todo-edit': "editTitle",
		'focusout .todo-edit': "editTitle", 
		'click .todo-remove': 'removeTodo',
		'click .todo-complete': 'completeTodo',
	},
	initialize() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},
	render() {
		this.$el.html(this.template(this.model.toJSON()));
		this.$(".todo-complete")[0].checked = this.model.get("isCompleted");
	},
	startEditTitle() {
		this.$el.addClass("editing");
		this.$(".todo-edit").focus();
	},
	editTitle(ev) {
		if(ev.keyCode === 13 || ev.type === 'focusout'){
			this.$el.removeClass("editing");
			this.model.save({
				title: this.$(".todo-edit").val(),
			});
		}
	},
	removeTodo() {
		this.remove();
		this.model.destroy();
	},
	completeTodo() {
		this.model.complete();
	},
	template: _.template(viewTemp),
});

export default TodoView;
