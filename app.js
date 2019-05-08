axios.get('https://api.vschool.io/AustinMorrill/todo').then((response)=> {
	createTodos(response.data)
})
const l = console.log

function createTodos(todos){
	todos.forEach((todo)=>{
		let parentDiv = document.createElement('div')
		let titleH2 = document.createElement('h2')
		titleH2.innerText = todo.title
		parentDiv.appendChild(titleH2)
		document.getElementById('main').appendChild(parentDiv)	
	})
}


// axios.post("https://api.vschool.io/AustinMorrill/todo"), {}

const deleteTodo = function(singleTodoObject) {
	// This "singleTodoObject" I passed in has an attribute "_id" I can use to delete it
	// I just need to add that "_id" to the end of my URL to which I'm sending this DELETE request
	axios.delete("https://api.vschool.io/austinmorrill/todo/" + singleTodoObject._id).then(
		function(response) {
			// This made a DELETE request to "https://api.vschool.io/jonsmith/todo/5630dcfcac2dfab2428b8c02"
			// Assuming I used the object from the example above.
			alert("Your todo was successfully deleted!")
		},
		function(response) {
			alert("There was a problem deleting your todo :(")
		}
	)
}