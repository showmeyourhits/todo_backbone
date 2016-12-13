import Backbone from 'backbone';

const TodoModel = Backbone.Model.extend({
	defaults: {
		isCompleted: false,
		title: '',
		order: null,
	},

	complete() {
		this.save({
			isCompleted: !this.get('isCompleted'),
		});
	},
});

export default TodoModel;
