import Backbone from 'backbone';
import LocalStorage from 'backbone.localstorage';
import TodoModel from './TodoModel';

export default Backbone.Collection.extend({
	model: TodoModel,
	localStorage: new Backbone.LocalStorage('todo-list-backbone'),
	comparator: 'order',
	initialize() {
		this.on('moveup', this.moveModelUp);
		this.on('movedown', this.moveModelDown);
	},
	nextOrder() {
		return this.length !== 0 ? (this.last().get('order') + 1) : 1;
	},
	moveModelUp(model) {
		let currIndex = this.indexOf(model),
			oldOrder = model.get("order");
		model.save({
			order: oldOrder - 1,
		});

		this.at(currIndex - 1).save({
			order: oldOrder,
		});
		this.sort();
	},
	moveModelDown(model) {
		let currIndex = this.indexOf(model),
			oldOrder = model.get("order");
		model.save({
			order: oldOrder + 1,
		});

		this.at(currIndex + 1).save({
			order: oldOrder,
		});
		this.sort();
	},
	filterCompleted(isCompleted) {
		return this.where({
			isCompleted,
		});
	},
});