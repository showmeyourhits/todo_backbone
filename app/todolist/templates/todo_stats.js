export default 
'<div id="undone"><%= undone %> left.</div>\
<% if (done) { %><div id="done"><%= done %> is completed. <button id="delete-completed">Delete em</button></div><% } %>';
