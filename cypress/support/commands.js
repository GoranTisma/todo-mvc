// ***********************************************
// This example commands.js shows you how to
// create the custom commands: 'createDefaultTodos'
// and 'createTodo'.
//
// The commands.js file is a great place to
// modify existing commands and create custom
// commands for use throughout your tests.
//
// You can read more about custom commands here:
// https://on.cypress.io/commands
// ***********************************************

Cypress.Commands.add('createDefaultTodos', function () {

  let TODO_ITEM_ONE = 'buy some cheese'
  let TODO_ITEM_TWO = 'feed the cat'
  let TODO_ITEM_THREE = 'book a doctors appointment'

  // begin the command here, which by will display
  // as a 'spinning blue state' in the UI to indicate
  // the command is running
  let cmd = Cypress.log({
    name: 'create default todos',
    message: [],
    consoleProps () {
      // we're creating our own custom message here
      // which will print out to our browsers console
      // whenever we click on this command
      return {
        'Inserted Todos': [TODO_ITEM_ONE, TODO_ITEM_TWO, TODO_ITEM_THREE],
      }
    },
  })

  // additionally we pass {log: false} to all of our
  // sub-commands so none of them will output to
  // our command log

  cy.get('.new-todo', { log: false })
  .type(`${TODO_ITEM_ONE}{enter}`, { log: false })
  .type(`${TODO_ITEM_TWO}{enter}`, { log: false })
  .type(`${TODO_ITEM_THREE}{enter}`, { log: false })

  cy.get('.todo-list li', { log: false })
  .then(function ($listItems) {
    // once we're done inserting each of the todos
    // above we want to return the .todo-list li's
    // to allow for further chaining and then
    // we want to snapshot the state of the DOM
    // and end the command so it goes from that
    // 'spinning blue state' to the 'finished state'
    cmd.set({ $el: $listItems }).snapshot().end()
  })
})

Cypress.Commands.add('createTodo', function (todo) {

  let cmd = Cypress.log({
    name: 'create todo',
    message: todo,
    consoleProps () {
      return {
        'Inserted Todo': todo,
      }
    },
  })

  // create the todo
  cy.get('.new-todo', { log: false }).type(`${todo}{enter}`, { log: false })

  // now go find the actual todo
  // in the todo list so we can
  // easily alias this in our tests
  // and set the $el so its highlighted
  cy.get('.todo-list', { log: false })
  .contains('li', todo.trim(), { log: false })
  .then(function ($li) {
    // set the $el for the command so
    // it highlights when we hover over
    // our command
    cmd.set({ $el: $li }).snapshot().end()
  })
})

Cypress.Commands.add('createItem', function (name) {
  cy
    .get('.new-todo').type(name).type('{enter}');
})

Cypress.Commands.add('createThreeItems', function (name1, name2, name3) {
  cy
    .createItem(name1)
    .createItem(name2)
    .createItem(name3);
})

Cypress.Commands.add('createThree', function () {
  cy
    .createItem('Goran')
    .createItem('Pera')
    .createItem('Zika');
})

Cypress.Commands.add('checkitems', function (name1, name2, name3) {
  cy
    .get('.todo-list').should('contain', name1)
    .and('contain', name2)
    .and('contain', name3);
})

Cypress.Commands.add('deleteAll', function () {
  cy
    .get('.destroy').eq(0).click({force: true})
    .get('.destroy').eq(0).click({force: true})
    .get('.destroy').eq(0).click({force: true})
})

Cypress.Commands.add('cekiranje1', function () {
  cy
    .get('.toggle').eq(0).check()
})

Cypress.Commands.add('cekiranje', function () {
  cy
    .get('.toggle-all').check()
})

Cypress.Commands.add('odcekiranje', function () {
  cy
    .get('.toggle-all').uncheck()
})

Cypress.Commands.add('promena', function () {
  cy
    .get('.todo-list li').eq(2).find('label').should('contain','Tile')
    .get('.todo-list li').eq(2).find('label').dblclick()
    .get('.todo-list li').eq(2).find('.edit').clear().type('majstor').type('{enter}');
})

Cypress.Commands.add('klik', function () {
  cy
    .get('a').contains('Completed').click()
    .get('a').contains('Active').click()
    .get('a').contains('All').click();
})
