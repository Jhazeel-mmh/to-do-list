import { createTodo } from "./createTodo";
import { Todo } from "./todo";

class StorageController{
    constructor(){
        this.todos = [];
    }

    getCategorys(){
        const categorys = new Set();
        this.todos.forEach(todo => todo.category ? categorys.add(todo.category) : "");
        return Array.from(categorys);
    }

    updateIds(){
        this.todos.forEach((todo, index) => todo.id = index);
    }

    saveInLocalStorage(arg = "todoList"){
        localStorage.setItem("todoList", JSON.stringify(this.todos));
    }
    
    addTodo(todo){  
        this.todos.push(todo);        
        this.updateIds();
        this.saveInLocalStorage();
    }

    // usar el atributo id del todo en todos en vez de splice.
    removeTodo(id){
        if (!id) return;
        if (id > this.todos.length - 1) return;
        
        this.todos.splice(id,1);
        this.updateIds();
        this.saveInLocalStorage();
    }

    // todo: cargar todos desde local storage
    loadFromLocalStore(arg = "todoList"){
        let result = localStorage.getItem(arg);
        let parsedResult, finalResult = [];
        if (result){
            parsedResult = JSON.parse(result);
        } else {
            return;
        }
        finalResult = parsedResult.map(todo =>  createTodo(todo.task, todo.done, todo.notes, todo.priority, todo.date, todo.category, todo.id));
        finalResult.sort((a, b) => a.id - b.id);
        this.todos = finalResult;
    }

    clearTodosFromLocarStorage(arg = "todoList"){
        localStorage.removeItem(arg);
    }

    getTodo(id){
        return this.todos[id];
    }

    getUndoneTodos(){
        return this.todos.filter(todo => todo.done === false);
    }

    getDoneTodos(){
        return this.todos.filter(todo => todo.done === true);
    }

    filterTodosThatstartsWith(value){
        return this.todos.filter(todo => todo.task.startsWith(value));
    }
}

export { StorageController };