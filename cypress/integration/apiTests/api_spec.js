describe('employees API', () => {
    let newId;

    it('verify request returns JSON', () => {
        cy.request('http://localhost:3000/employees')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json')
    })

    it('verify the request returns the correct status code', () => {
        cy.request('http://localhost:3000/employees')
            .its('status')
            .should('be.equal', 200)
    })

    it('verify the request returns 50 items', () => {
        cy.request('http://localhost:3000/employees')
            .its('body')
            .should('have.length', 50)
    })

    it('Add a new item', () => {
        cy.request('POST', 'http://localhost:3000/employees',{ first_name: 'New', last_name: 'Dude', email: "new_dude@googling.com" })
            .its('body').then((body) => {
            newId = body.id;
        })
    })

    it('Verify the new item exists', () => {
        cy.request('http://localhost:3000/employees/' + newId).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('first_name', 'New')
            expect(response.body).to.have.property('last_name', 'Dude')
            expect(response.body).to.have.property('email', 'new_dude@googling.com')
        })
    })

    it('Delete the newly added item', () => {
        cy.request('DELETE', 'http://localhost:3000/employees/' + newId).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('Verify the item was deleted', () => {
        cy.request({url: 'http://localhost:3000/employees/' + newId, failOnStatusCode: false}).then((response) => {
            expect(response.status).to.eq(404)
        })
    })
})
