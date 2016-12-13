import _ from 'underscore';
import Backbone from 'backbone';
import viewTemp from './../templates/todoview.js';

export default Backbone.View.extend({
	tagName: 'li',
	className: 'todo',
	events: {
		'click .todo__complete': 'completeTodo',
		'dblclick': 'startEditTitle',
		'keypress .todo__edit': 'editTitle',
		'focusout .todo__edit': 'editTitle',
		'click .todo__order-btn--up': 'moveUp',
		'click .todo__order-btn--down': 'moveDown',
		'click .todo__btn-delete': 'removeTodo',
	},
	template: _.template(viewTemp),
	initialize() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},
	render() {
		this.$el.html(this.template(this.model.toJSON()));
		this.$('.todo__complete')[0].checked = this.model.get('isCompleted');
		return this;
	},
	completeTodo() {
		this.model.complete();
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
	swapOrders(){},
	moveUp(ev) {
		// there is no need to check model order
		// because user can't see edge view's buttons
		if (this.model.order !== 1){
			console.log("movin on up");
			this.model.trigger("moveup", this.model);
			this.$el.insertBefore(this.$el.prev());
		}
	},
	moveDown(ev) {
		console.log("movin on down");
		this.model.trigger("movedown", this.model);
		this.$el.insertAfter(this.$el.next());
	},
	removeTodo() {
		this.model.destroy();
	},
});
