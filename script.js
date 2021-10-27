let todosArray = [
    {id: 1 ,title:'qwerty'},
]

let form = document.querySelector('form')
let index = 1
const todos = document.querySelector('.todo-results')
const task = todos.querySelector('.todo-result')

let editingTodo = null


const showTodo = todo => {
    let clone = task.cloneNode(true)
    todos.appendChild(clone)
    clone.classList.remove('is-hidden')

    let id = index++
    clone.setAttribute('id', id)
    clone.querySelector('.title').textContent = todo.title
    clone.querySelector('#delete').dataset.id = id
    clone.querySelector('#edit').dataset.id = id
}

const editTodo = todoId => {
    let todo = todosArray.find(todo => String(todo.id) === todoId)

    form.task.value = todo.title

    form.querySelector('button').textContent = 'Update'

    editingTodo = todo
}

const deleteTask = todoTitle => {
    todosArray = todosArray.filter(todo => todo.title !== todoTitle)
    document.getElementById(todoTitle).remove()
    console.log(todos);
}


todosArray.forEach(task => showTodo(task))

const validate = title => {
    let hasTitle = todosArray.find(todo => todo.title === title)
    if (hasTitle && hasTitle.title === editingTodo.title) {
        return false
    }else if (hasTitle) {
        alert(`Todo ${form.task.value} is already added!`)
        form.task.classList.add('is-danger')
        form.task.focus()

        return true
    }

    return false
}



form.addEventListener('submit', event => {
    event.preventDefault()

    let hasTitle = validate(form.task.value)
    if (!hasTitle && editingTodo) {
        let thisTodo = document.getElementById(editingTodo.id)

        todosArray = todosArray.map(todo => {
            if (editingTodo.id === todo.id) {
                todo.title = form.task.value
            }
            return todo
        })

        thisTodo.querySelector('.title').textContent = form.task.value

        form.reset()
        form.querySelector('button').textContent = 'Add'
        form.title.classList.remove('is-danger')

        editingTodo = null
        console.log(todos)
    }else if (!hasTitle) {
        // Adding Card
        let todo = {
            id: index,
            title: form.task.value
        }

        todosArray.push(todo)
        showTodo(todo)

        form.reset()
        form.task.classList.remove('is-danger')
    }

})