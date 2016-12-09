import _ from "underscore";
import $ from "jquery";
import Backbone from "backbone";
import TodoModel from "./todolist/models/TodoModel";
import TodoList from "./todolist/models/TodoList";
import TodoView from "./todolist/views/TodoView";
import TodoListView from "./todolist/views/TodoListView";

require("html!./index.html");
console.log(TodoList, TodoModel, TodoView, TodoListView);