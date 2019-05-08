const l = console.log
const addTodo = document.addTodo
let remove = document.getElementsByClassName("remove")
let edit = document.getElementsByClassName("edit")
let todoList = []


axios.get('https://api.vschool.io/AustinMorrill/todo').then((response)=> {
	todoList = response.data
	createTodoList(todoList)
})

addTodo.addEventListener('submit', function(e){
	e.preventDefault();
	let title = addTodo.newTitle.value
	let description = addTodo.newDescription.value
	let price = addTodo.newPrice.value
	let imgUrl = addTodo.newImage.value
	let newTodo = {
		title,
		description, 
		price,
		imgUrl
	}
	postTodo(newTodo)
})

const postTodo = (newTodo)=> {
	axios.post("https://api.vschool.io/AustinMorrill/todo", newTodo).then((response)=>{
		createTodoList([response.data])
	})
}

function createTodoList(todos, completed){
	if(completed){
		document.getElementById('todoList').innerHTML = ""
	}
	todos.forEach((todo)=>{
		let div = document.createElement('div')
		let img = document.createElement('img')
		let h2 = document.createElement('h2')
		let parentDiv = div
		let title = h2
		let completeCheckBox = document.createElement("input")
		let price = document.createElement("span")
		let description = document.createElement("span")
		let editButton = document.createElement("button")
		let deleteButton = document.createElement("button")
		let listImg = img
		let checkedLabel = document.createElement('label')
		setAttributes(parentDiv, {'id': todo._id, 'class': 'todoItem'})
		setAttributes(deleteButton, {'class': 'deleteButton'})
		setAttributes(editButton, {'class': 'editButton'})
		setAttributes(completeCheckBox, {'type': 'checkbox', 'class': 'completeCheckBox', 'id': 'completeCheckBox'})
		title.setAttribute('class', 'title')
		listImg.setAttribute("src", todo.imgUrl)
		title.innerText = todo.title
		checkedLabel.innerText = 'Completed'
		description.innerText = `Description: ${todo.description}`
		price.innerText = `Price $${todo.price}`
		deleteButton.innerText = 'Delete'
		deleteButton.addEventListener('click',function() {
			axios.delete(`https://api.vschool.io/AustinMorrill/todo/${todo._id}`)
			this.parentNode.remove()
			alert("Your todo was successfully deleted!")
		})
		editButton.innerText = 'Edit'
		editButton.addEventListener('click', function(){
			editFunc(todo)
		})
		completeCheckBox.addEventListener('click', function() {
					completedCheck(todo)
					this.checked ?
						(this.previousSibling.style.textDecoration = 'line-through') :
						(this.previousSibling.style.textDecoration = 'none')
		})			

		parentDiv.appendChild(title)
		parentDiv.appendChild(completeCheckBox)
		// parentDiv.appendChild(checkedLabel)
		parentDiv.appendChild(description)
		parentDiv.appendChild(price)
		parentDiv.appendChild(listImg)
		parentDiv.appendChild(editButton)
		parentDiv.appendChild(deleteButton)

		if (todo.completed){
			title.style.textDecoration = "line-through"
			completeCheckBox.setAttribute("checked", "checked")
		}

		document.getElementById('todoList').appendChild(parentDiv)
	})
}

function setAttributes(el, attrs) {
	for (var key in attrs) {
		el.setAttribute(key, attrs[key])
	}
}


function completedCheck(todo) {
	l(todoList)
	axios.put(`https://api.vschool.io/AustinMorrill/todo/${todo._id}`, {completed: !todo.completed}).then(response => {
		const updatedTodos = todoList.map(oldTodo =>
			oldTodo._id === todo._id ? (oldTodo = response.data) : oldTodo)
		createTodoList(updatedTodos, true)
		l(updatedTodos)
	})
}

function editFunc(todo){
		l(todo)
		todo.innerHTML = ""
		// let titleBox = document.createElement("input")
		// let description = document.createElement("input")
		// let price = document.createElement("input")
		// let imgUrl = document.createElement("input")
		// setAttributes(titleBox, { type: "text", value: todo.title })
		// setAttributes(description, { type: "text", value: todo.description })
		// setAttributes(price, { type: "input", value: todo.price })
		// setAttributes(imgUrl, { type: "url", value: todo.imgUrl })
		// this.parentNode.appendChild(titleBox)
		// this.parentNode.appendChild(description)
		// this.appendChild(price)
		// this.appendChild(imgUrl)
}