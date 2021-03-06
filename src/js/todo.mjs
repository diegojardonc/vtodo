export default function Todo (name) {

    // Validation against empty or undefined todo name
    if (name === undefined || name === '') return null

    // Creates sub-elements
    let todo = document.createElement('li'),
        check = document.createElement('input'),
        title = document.createElement('span'),
        editTodo = document.createElement('form'),
            editTodoInput = document.createElement('input'),
            editTodoSubmit = document.createElement('button'),
        remove = document.createElement('button')

    // Base element set up (classes, properties, etc)
    todo.classList.add('todo')
        check.classList.add('todo__do')
        title.classList.add('todo__title')
        editTodo.classList.add('todo__edit-todo-title')
        editTodo.classList.add('todo__edit-todo-title--is-hidden')
            editTodoInput.classList.add('todo__edit-todo-title__title')
            editTodoInput.value = name
            editTodoSubmit.classList.add('todo__edit-todo-title__edit')
        remove.classList.add('todo__remove')
        editTodoSubmit.type = 'submit'
        editTodoSubmit.innerText = '✏'
        check.type = 'checkbox'
        title.innerText = name
        editTodo.type = 'text'
        remove.innerText = '✖'

    // Event-listeners

    // On change for checkbox append to list of completed todos
    check.addEventListener('change', function (e) {
        if (e.target.checked) {
            e.target.parentElement.parentElement.nextElementSibling.appendChild(e.target.parentElement)
        } else {
            e.target.parentElement.parentElement.previousElementSibling.appendChild(e.target.parentElement)
        }
    })


    // On click for todo show form
    title.addEventListener('click', function (e) {
        title.classList.toggle('todo__title--is-hidden')
        editTodo.classList.toggle('todo__edit-todo-title--is-hidden')
        editTodoInput.value = e.target.innerText
        editTodoInput.focus()
    })

    // On input blur hide form
    editTodoInput.addEventListener('blur', function (e) {
        editTodo.classList.toggle('todo__edit-todo-title--is-hidden')
        title.classList.toggle('todo__title--is-hidden')

        if (e.target.value === undefined || e.target.value === '') return

        title.innerText = e.target.value
    })

    editTodoInput.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) editTodo.dispatchEvent(new Event('submit'));
    })

    // On submit hide form
    editTodo.addEventListener('submit', function (e) {
        e.preventDefault()
        
        editTodo.classList.toggle('todo__edit-todo-title--is-hidden')
        title.classList.toggle('todo__title--is-hidden')

        if (
            editTodoInput.value === undefined ||
            editTodoInput.value.trim() === ''
        ) return

        title.innerText = editTodoInput.value
    })

    // Remove todo
    remove.addEventListener('click', function (e) {
        todo.remove()
    })

    editTodo.appendChild(editTodoInput)
    editTodo.appendChild(editTodoSubmit)
    todo.appendChild(check)
    todo.appendChild(title)
    todo.appendChild(editTodo)
    todo.appendChild(remove)

    return todo
}