import { $, $$, c$, createImage } from "./DOMManipulationFunctions"

class DOMController {
    constructor(){
        this.categorys = [];
    }

    updateCategorys(list){
        this.categorys = list;
    }
    // todo: addthe add function to display a form that adds a div. Remember to get the categorys from all the task and display them in a select input
    // probably you gotta add some other function in the storageController 
    // DONE, I UPDATE THE IMPLEMENTATION OF displayFormOfTodo() TO USE IN CASE OF ADD/SHOW A TODO 


    // ADD A ID TO THE TASK DIV TO IMPROVE THE JS DELEGATION EVENT WHEN SOMEONE CLICKS  IN THE TODO TO SHOW HIS INFO
    showTasks(list){
        let mainDiv = $(".main");
        list.forEach(todo => {
            let task = c$("div", "task-item")
            task.innerHTML = `
                <input type="checkbox" id="${todo.id}" class="todo-checkbox">
                <p class="todo-item-todo">${todo.task}</p>
            `
            mainDiv.appendChild(task);
        });
    }

    displayCategorysNav(list){
        let categoryNav = $(".category-nav");
        list.forEach(c => {
            let btn = c$("button", "category-item", c)
            btn.value = c;
            categoryNav.appendChild(btn);
        });
    }

    displayFormOfTodo(todo = false){
        let div = c$("div", "details-form");
        let prioritySelectedElement;
        if (todo){
            prioritySelectedElement = this.determineSelectedByPriority(todo.priority);
            div.id = "details-" + todo.id;
        } else {
            prioritySelectedElement = this.determineSelectedByPriority()
        }
       
        div.innerHTML = `
            <form id="add-task-form">
                <button class="close-details-btn">X</button>
                <div class="todo-inputs">
                    <p id="todo-wrapper">
                        <input id="todo-task" value="${todo.task ? todo.task : ""}">
                    </p>
                    <p id="notes-wrapper">
                        <textarea id="todo-notes">${todo.notes ? todo.notes : ""}</textarea>    
                    </p>
                    <p id="priority-wrapper">
                        <label for="taskPriority">Priority:</label>
                        <select id="taskPriority" name="priority">
                            ${prioritySelectedElement}
                        </select>
                    </p>
                    <p id="date-wrapper">
                        <label for="todo-date">Date:</label>
                        <input type="date" name="date" id="todo-date" value="${todo ? this.displayDateOfTodo(todo) : ""}">
                    </p>
                    <p id="category-wrapper">
                        <label for="todo-category">Category: </label>
                        ${this.displayCategoryInput(todo.category ? todo.category : "")}
                        ${this.displayCategoryDatalist(this.categorys)}
                    </p>
                    <p id="submit-wrapper">
                        <input type="submit" value="Save" id="submitform">
                    </p> 
                </div>
            </form>
        `
        document.body.appendChild(div);
        this.closeDetailsDiv(div);
    }   

    displayCategoryInput(value){
        let categoryInput = c$("input", "ci","todo-category");
        categoryInput.type = "text";
        categoryInput.value = value;
        categoryInput.setAttribute("list", "categoryList");
        return categoryInput.outerHTML;
    }

    displayCategoryDatalist(list){
        let datalist = c$("datalist", "datalist", "categoryList");
        if (list){
            datalist.innerHTML = list.map(category => `<option value="${category}">`).join("");
        }
        return datalist.outerHTML;
    }

    displayDateOfTodo(todo){
        let date = todo.date;
        const formattedDate = date.toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
        return formattedDate;
    }

    closeDetailsDiv(element){
        let closeBtn = $(".close-details-btn");
        closeBtn.addEventListener("click", () => document.removeChild(element));
    }

    determineSelectedByPriority(priority){
        switch (priority) {
            case 3:
                return `
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high" selected>high</option>
                `;
            case 2:
                return `
                    <option value="low">low</option>
                    <option value="medium" selected>medium</option>
                    <option value="high">high</option>
                `;
            case 1:
                return `
                    <option value="low" selected>low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                `;
            default:
                return `
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                `;
        }
    }

}   

export { DOMController };