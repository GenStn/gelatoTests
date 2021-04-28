describe('lol', () => {
    let gelatoPage = require('./gelato_page')

    beforeEach(() =>{
        cy.visit('/')
        cy.get(gelatoPage.gelatoTitle, {timeout:30000})
            .should('be.visible')
    })

    it('Assert page elements are displayed', ()=>{
        cy.get(gelatoPage.searchInput)
            .should('be.visible')
        cy.get(gelatoPage.doubleClickHint)
            .should('be.visible')
        cy.get(gelatoPage.createdByHint)
            .should('be.visible')
        cy.get(gelatoPage.partOfHint)
            .should('be.visible')
        cy.get(gelatoPage.todoMvcLink)
            .should('be.visible')
    })

    it('Assert input editing ', () => {
        cy.get(gelatoPage.searchInput)
            .type('123 test')
            .should('have.value', '123 test')
            .clear()
            .should('be.empty')
    });

    it('Assert all elements after added "todo" are displayed', () => {
        const todotext = '123 test';

        cy.get(gelatoPage.searchInput)
            .type(todotext)
            .type('{enter}')
        cy.get(gelatoPage.countTodosLeft)
            .should('have.text', '1 item left')
        cy.get(gelatoPage.allTodosButton)
            .should('be.visible')
            .should('have.class', 'selected')
        cy.get(gelatoPage.activeTodosButton)
            .should('be.visible')
            .should('not.have.class', 'selected')
        cy.get(gelatoPage.completedTodosButton)
            .should('be.visible')
            .should('not.have.class', 'selected');

        cy.get(gelatoPage.selectAllToggle)
            .should('be.visible')
            .click();
        cy.get(gelatoPage.clearCompletedButton)
            .should('be.visible');

        //force "todos" from the list to show 'cross' icon
        gelatoPage.getDeleteTodoButtonByTodoName(todotext)
            .invoke('show');

        gelatoPage.getDeleteTodoButtonByTodoName(todotext)
            .should('be.visible');
    });

    const specialCharsTodos = [
        "null",
        "empty",
        "#$%&'()*+,-./:;<=>?@[]^_`}|{~",
        "áéíóúýÁÉÍÓÚÝ",
        "àèìòùÀÈÌÒÙ",
        "âêîôûÂÊÎÔÛ",
        "ãñõÃÑÕ",
        "äëïöüÿÄËÏÖÜŸ",
        "åÅ",
        "æÆ",
        "œŒ",
        "çÇ",
        "ðÐ",
        "øØ",
        "¿¡ß"
    ]

    it('Assert adding todos with special characters ', () => {
        specialCharsTodos.forEach(todo => {
            gelatoPage.addTodo(todo)
            gelatoPage.getTodoByNameWithoutRegexp(todo)
                .should('be.visible');
        })
    });

    const threeTodos = [
        "first",
        "2nd",
        "3"
    ]

    it('Assert deleting by "cross" delete icon (one by one)', () => {
        threeTodos.forEach(todo => {
            gelatoPage.addTodo(todo)
        })
        threeTodos.forEach(todo =>{
            gelatoPage.deleteTodoByName(todo)
        })
        cy.get(gelatoPage.listOfTodos)
            .should('not.exist');

        //assert adding after deleting
        const twoTodos = threeTodos.slice(0, 2)
        console.log(twoTodos)
        twoTodos.forEach(todo => {
            gelatoPage.addTodo(todo)
        })
        gelatoPage.deleteTodoByName(twoTodos[0]);
        gelatoPage.assertTodoByNameNotExists(twoTodos[0]);
        gelatoPage.getTodoByName(twoTodos[1])
            .should('be.visible');

        //assert after page refresh
        cy.reload();
        gelatoPage.assertTodoByNameNotExists(twoTodos[0]);
        gelatoPage.getTodoByName(twoTodos[1])
            .should('be.visible');
    });

    const fourTodos = [
        "first",
        "2nd",
        "3",
        "four 4"
    ]

    it('Assert "All, Active, Completed" buttons', function () {
        fourTodos.forEach(todo =>{
            gelatoPage.addTodo(todo);
        })

        cy.get(gelatoPage.activeTodosButton).click();
        fourTodos.forEach(todo =>{
            gelatoPage.getTodoByName(todo)
                .should('be.visible');
        })

        cy.get(gelatoPage.completedTodosButton).click();

        cy.get(gelatoPage.listOfTodos)
            .should('not.be.visible');

        cy.get(gelatoPage.allTodosButton).click();
        gelatoPage.checkTodoByName(fourTodos[0]);
        cy.get(gelatoPage.countTodosLeft)
            .should('have.text', '3 items left')
        gelatoPage.checkTodoByName(fourTodos[2]);
        cy.get(gelatoPage.countTodosLeft)
            .should('have.text', '2 items left')

        cy.get(gelatoPage.activeTodosButton).click();
        cy.get(gelatoPage.countTodosLeft)
            .should('have.text', '2 items left')
        gelatoPage.getTodoByName(fourTodos[1])
            .should('be.visible');
        gelatoPage.getTodoByName(fourTodos[3])
            .should('be.visible');
        gelatoPage.assertTodoByNameNotExists(fourTodos[0]);
        gelatoPage.assertTodoByNameNotExists(fourTodos[2]);

        cy.get(gelatoPage.completedTodosButton).click();
        cy.get(gelatoPage.countTodosLeft)
            .should('have.text', '2 items left')
        gelatoPage.getTodoByName(fourTodos[0])
            .should('be.visible');
        gelatoPage.getTodoByName(fourTodos[2])
            .should('be.visible');
        gelatoPage.assertTodoByNameNotExists(fourTodos[1]);
        gelatoPage.assertTodoByNameNotExists(fourTodos[3]);

        cy.get(gelatoPage.allTodosButton).click();
        gelatoPage.assertTodoIsChecked(fourTodos[0])
        gelatoPage.assertTodoIsChecked(fourTodos[2])
        gelatoPage.assertTodoIsUnchecked(fourTodos[1])
        gelatoPage.assertTodoIsUnchecked(fourTodos[3])

        //assert after page refresh
        cy.reload()
        gelatoPage.assertTodoIsChecked(fourTodos[0])
        gelatoPage.assertTodoIsChecked(fourTodos[2])
        gelatoPage.assertTodoIsUnchecked(fourTodos[1])
        gelatoPage.assertTodoIsUnchecked(fourTodos[3])

        //check the rest todos
        gelatoPage.checkTodoByName(fourTodos[1])
        cy.get(gelatoPage.countTodosLeft)
            .should('have.text', '1 item left')
        gelatoPage.checkTodoByName(fourTodos[3])
        cy.get(gelatoPage.countTodosLeft)
            .should('have.text', '0 items left')

        fourTodos.forEach(todo =>{
            gelatoPage.assertTodoIsChecked(todo)
        })

        cy.get(gelatoPage.activeTodosButton).click()

        cy.get(gelatoPage.listOfTodos)
            .should('not.be.visible');
        cy.get(gelatoPage.countTodosLeft)
            .should('have.text', '0 items left')

        cy.get(gelatoPage.completedTodosButton).click()
        cy.get(gelatoPage.countTodosLeft)
            .should('have.text', '0 items left')
        fourTodos.forEach(todo =>{
            gelatoPage.assertTodoIsChecked(todo)
        })

        //uncheck all todos
        fourTodos.forEach(todo =>{
            gelatoPage.unCheckTodoByName(todo)
        })
        cy.get(gelatoPage.listOfTodos)
            .should('not.be.visible');
        cy.get(gelatoPage.countTodosLeft)
            .should('have.text', '4 items left')

        cy.get(gelatoPage.activeTodosButton).click()
        fourTodos.forEach(todo =>{
            gelatoPage.assertTodoIsUnchecked(todo)
        })
        cy.get(gelatoPage.countTodosLeft)
            .should('have.text', '4 items left')

        cy.get(gelatoPage.allTodosButton).click()
        fourTodos.forEach(todo =>{
            gelatoPage.assertTodoIsUnchecked(todo)
        })
        cy.get(gelatoPage.countTodosLeft)
            .should('have.text', '4 items left')
    });

    it('Assert "clear completed" button', () =>{
        fourTodos.forEach(todo =>{
            gelatoPage.addTodo(todo);
        })
        //assert 'Clear Completed' button not exists if none of todos are checked
        cy.get(gelatoPage.clearCompletedButton)
            .should('not.exist');

        //check deleting for 'All' todos
        gelatoPage.checkTodoByName(fourTodos[0]);
        cy.get(gelatoPage.clearCompletedButton)
            .should('be.visible')
            .click();
        gelatoPage.assertTodoByNameNotExists(fourTodos[0]);
        gelatoPage.assertTodoIsUnchecked(fourTodos[1])
        gelatoPage.assertTodoIsUnchecked(fourTodos[2])
        gelatoPage.assertTodoIsUnchecked(fourTodos[3])
        cy.get(gelatoPage.clearCompletedButton)
            .should('not.exist');

        //check deleting for 'Active' todos
        cy.get(gelatoPage.activeTodosButton).click();
        gelatoPage.checkTodoByName(fourTodos[3]);
        cy.get(gelatoPage.clearCompletedButton)
            .should('be.visible')
            .click();
        gelatoPage.assertTodoByNameNotExists(fourTodos[3]);
        gelatoPage.assertTodoByNameNotExists(fourTodos[0]);
        gelatoPage.assertTodoIsUnchecked(fourTodos[1])
        gelatoPage.assertTodoIsUnchecked(fourTodos[2])
        cy.get(gelatoPage.clearCompletedButton)
            .should('not.exist');

        //check deleting for 'Completed' todos
        gelatoPage.checkTodoByName(fourTodos[2]);
        cy.get(gelatoPage.completedTodosButton).click();
        cy.get(gelatoPage.clearCompletedButton)
            .should('be.visible')
            .click();
        cy.get(gelatoPage.listOfTodos)
            .should('not.be.visible');
        cy.get(gelatoPage.clearCompletedButton)
            .should('not.exist');

        cy.get(gelatoPage.activeTodosButton).click();
        gelatoPage.assertTodoByNameNotExists(fourTodos[2]);
        gelatoPage.assertTodoByNameNotExists(fourTodos[3]);
        gelatoPage.assertTodoByNameNotExists(fourTodos[0]);
        gelatoPage.assertTodoIsUnchecked(fourTodos[1])

        cy.get(gelatoPage.allTodosButton).click();
        gelatoPage.assertTodoByNameNotExists(fourTodos[2]);
        gelatoPage.assertTodoByNameNotExists(fourTodos[3]);
        gelatoPage.assertTodoByNameNotExists(fourTodos[0]);
        gelatoPage.assertTodoIsUnchecked(fourTodos[1])
    })

    it('Assert renamed "Todos" editing and deleting', () =>{
        threeTodos.forEach(todo =>{
            gelatoPage.addTodo(todo)
        })

        //Assert editing of unchecked todos
        gelatoPage.editTodoByName(threeTodos[1], 'Updated ' + threeTodos[1])

        gelatoPage.getTodoByName('Updated ' + threeTodos[1])
            .should('be.visible');
        gelatoPage.assertTodoByNameNotExists(threeTodos[1]);

        //Assert editing of checked todos
        gelatoPage.checkTodoByName(threeTodos[2])
        gelatoPage.editTodoByName(threeTodos[2], 'Updated ' + threeTodos[2])

        gelatoPage.getTodoByName('Updated ' + threeTodos[2])
            .should('be.visible');
        gelatoPage.assertTodoByNameNotExists(threeTodos[2]);


        //assert after page refresh
        cy.reload();
        gelatoPage.getTodoByName('Updated ' + threeTodos[1])
            .should('be.visible');
        gelatoPage.getTodoByName('Updated ' + threeTodos[2])
            .should('be.visible');
        gelatoPage.assertTodoByNameNotExists(threeTodos[1]);
        gelatoPage.assertTodoByNameNotExists(threeTodos[2]);

        //assert deleting of renamed todos
        gelatoPage.deleteTodoByName('Updated ' + threeTodos[1])
        gelatoPage.deleteTodoByName('Updated ' + threeTodos[2])

        gelatoPage.assertTodoByNameNotExists('Updated ' + threeTodos[1])
        gelatoPage.assertTodoByNameNotExists('Updated ' + threeTodos[2])
        gelatoPage.getTodoByName(threeTodos[0])
            .should('be.visible');
        cy.get(gelatoPage.countTodosLeft)
            .should('have.text', '1 item left');
    })
})