describe('VEZBA', function () {
    beforeEach(function () {
        cy.visit('/')
      })

    it('helouu vrlddd', function () {
        cy.get('.new-todo').type('Goran').type('{enter}')
        cy.get('.new-todo').type('Tisma').type('{enter}')
        cy.get('.new-todo').type('Tile').type('{enter}')
        cy.get('.toggle').first().check()
        cy.contains('Completed').click()
        cy.contains('Active').click()
        cy.contains('All').click()
        cy.get('.toggle').eq(1).check()
        cy.contains('Completed').click()
        cy.contains('Active').click()
        cy.contains('All').click()
        cy.get('.todo-list li').eq(2).find('label').should('contain','Tile')
        cy.get('.todo-list li').eq(2).find('label').dblclick()
        cy.get('.todo-list li').eq(2).find('.edit').clear().type('majstor').type('{enter}')
        cy.contains('majstor').dblclick()
        cy.get('.todo-list li').eq(2).find('.edit').clear().type('doktor').type('{enter}')
        cy.get('.toggle').eq(0).uncheck()
        cy.get('.clear-completed').click()
        cy.contains('doktor').dblclick()
        cy.get('.todo-list li').eq(1).find('.edit').clear().type('{enter}')
        
     })

    it('check if is possible to type into the input field', function () {
        cy
          .createThree();
    });

    it('check if list contains typed datas', function () {
        cy
          .get('.new-todo').type('Goran').type('{enter}')
          .get('.new-todo').type('Tisma').type('{enter}')
          .get('.new-todo').type('Tile').type('{enter}');
    });

    it.only('check items', function () {
        cy
          .createThreeItems('Goran','Tisma','Tile')
          .checkitems('Goran','Tisma','Tile')
          .deleteAll();
    });
    });
