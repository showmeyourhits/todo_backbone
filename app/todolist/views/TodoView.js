import _ from 'underscore';
import Backbone from 'backbone';
import viewTemp from './../templates/todoview.js';

const TodoView = Backbone.View.extend({
	tagName: 'li',
	className: 'todo',
	events: {
		'dblclick': 'startEditTitle',
		'keypress .todo__edit': 'editTitle',
		'focusout .todo__edit': 'editTitle',
		'click .todo__btn-delete': 'removeTodo',
		'click .todo__complete': 'completeTodo',
	},
	initialize() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},
	render() {
		this.$el.html(this.template(this.model.toJSON()));
		this.$('.todo__complete')[0].checked = this.model.get('isCompleted');
	},
	startEditTitle() {
		this.$el.addClass('todo--editing');
		this.$('.todo__edit').focus();
	},
	editTitle(ev) {
		if (ev.keyCode === 13 || ev.type === 'focusout') {
			this.$el.removeClass('todo--editing');
			this.model.save({
				title: this.$('.todo__edit').val(),
			});
		}
	},
	removeTodo() {
		this.model.destroy();
	},
	completeTodo() {
		this.model.complete();
	},
	template: _.template(viewTemp),
});

export default TodoView;
