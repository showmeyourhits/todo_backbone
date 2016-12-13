import Backbone from 'backbone';

export default Backbone.Model.extend({
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
