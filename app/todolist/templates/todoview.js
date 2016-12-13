export default '<div class="todo__content">'
+ '<input class="todo__complete" type="checkbox">'
+ '<span class="todo__title"><%= title %></span>'
+ '<div class="todo__order"><button class="todo__order-btn todo__order-btn--up">&#9650</button>'
+ '<button class=" todo__order-btn todo__order-btn--down">&#9660</button></div>'
+ '<button class="todo__btn-delete">X</button></div>'
+ '<input class="todo__edit text-input" type="text" value="<%= title %>">';
