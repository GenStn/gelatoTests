export const gelatoTitle = 'h1:contains("todos")',
    searchInput = 'input.new-todo',
    doubleClickHint = 'p:contains("Double-click to edit a todo")',
    createdByHint = 'p:contains("Created by ")',
    partOfHint = 'p:contains("Part of ")',
    todoMvcLink = 'a[href="http://todomvc.com"]',
    selectAllToggle = 'label[for="toggle-all"]',
    listOfTodos = '.todo-list',
    countTodosLeft = '.todo-count',
    allTodosButton = '.filters a:contains("All")',
    activeTodosButton = '.filters a:contains("Active")',
    completedTodosButton = '.filters a:contains("Completed")',
    clearCompletedButton = '.clear-completed:contains("Clear completed")'; //search by text too just for case if text'll be changed (locator will be broken)

let getTodoByName = name => {
    return cy.get(listOfTodos)
        .find(`label:contains(${name})`).contains(new RegExp(`^(${name})`))
        .parent();
}

let getTodoByNameWithoutRegexp = name => {
    return cy.get(listOfTodos)
        .find(`label:contains(${name})`)
        .parent();
}

let checkTodoByName = name => {
    getTodoByName(name)
        .find('input')
        .check();
}

let unCheckTodoByName = name => {
    getTodoByName(name)
        .find('input')
        .uncheck();
}

let getDeleteTodoButtonByTodoName = name => {
    return getTodoByName(name).find('button');
}

let deleteTodoByName = name => {
    getDeleteTodoButtonByTodoName(name)
        .invoke('show')
        .should('be.enabled')
        .click();
}

let addTodo = (name) => {
    cy.get(searchInput)
        .type(name)
        .should('have.value', name)
        .type('{enter}')
}

let assertTodoByNameNotExists = name => {
    cy.get(`label`)
        .contains(new RegExp(`^(${name})`))
        .should('not.exist');
}

let assertTodoIsChecked = name =>{
    getTodoByName(name)
        .parent()
        .should('have.class', 'completed');
}

let assertTodoIsUnchecked = name =>{
    getTodoByName(name)
        .parent()
        .should('not.have.class', 'completed');
}

let editTodoByName = (name, newText) =>{
    getTodoByName(name)
        .dblclick()
        .parent()
        .find('input.edit')
        .type('{selectall}')
        .type(newText)
        .type('{enter}')
}

export {
    getTodoByName,
    getTodoByNameWithoutRegexp,
    checkTodoByName,
    unCheckTodoByName,
    getDeleteTodoButtonByTodoName,
    deleteTodoByName,
    assertTodoByNameNotExists,
    addTodo,
    assertTodoIsChecked,
    assertTodoIsUnchecked,
    editTodoByName
}
