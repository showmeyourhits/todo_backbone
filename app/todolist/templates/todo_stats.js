export default '<div id="undone" class="todo-app__stats todo-stats__undone"><%= undone %> left.</div>'
+ '<% if (done) { %><div id="done" class="todo-stats__done"><%= done %> is completed.'
+ '<button id="delete-completed">Delete em</button></div><% } %>';
