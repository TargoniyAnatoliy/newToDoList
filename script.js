
class TodoModel {
    constructor() {
        this.todos = [];
    }

    addTodo(todoText) {
        this.todos.push({ text: todoText, completed: false });
    }

    toggleTodoCompletion(index) {
        this.todos[index].completed = !this.todos[index].completed;
    }

    getTodos() {
        return this.todos;
    }
}

class TodoView {
    constructor() {
        this.todoList = document.getElementById('todo-list');
    }

    renderTodos(todos) {
        this.todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const todoItem = document.createElement('li');
            todoItem.textContent = todo.text;
            (todo.completed) ?
                todoItem.classList.add('completed') :
                todoItem.classList.remove('completed');

            todoItem.addEventListener('click', () => {
                controller.toggleTodoCompletion(index);
            });
            this.todoList.appendChild(todoItem);
        });
    }
}

class TodoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    addTodo(todoText) {
        this.model.addTodo(todoText);
        this.view.renderTodos(this.model.getTodos());
    }

    toggleTodoCompletion(index) {
        this.model.toggleTodoCompletion(index);
        this.view.renderTodos(this.model.getTodos());
    }
}

const todoModel = new TodoModel();
const todoView = new TodoView();
const controller = new TodoController(todoModel, todoView);

document.querySelector('#add-todo').addEventListener('click', () => {
    let input = document.querySelector('#todo-input');
    const todoText = input.value;
    controller.addTodo(todoText);
    input.value = '';
});

document.querySelector('#todo-input').addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
        let input = document.querySelector('#todo-input');
        const todoText = input.value;
        controller.addTodo(todoText);
        input.value = '';
    }
});