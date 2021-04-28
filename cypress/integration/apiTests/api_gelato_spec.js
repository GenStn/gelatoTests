describe('basic gelato API tests', () => {
    it('Assert init APIs', () => {
        cy.request('https://todomvc.com/examples/react/')
            .then(response => {
                expect(response.status).be.eq(200)
                expect(response.statusText).be.eq('OK')
            })
        cy.request('https://todomvc.com/examples/react/node_modules/todomvc-common/base.css')
            .then(response => {
                expect(response.status).be.eq(200)
                expect(response.statusText).be.eq('OK')
                expect(response.isOkStatusCode).be.eq(true)
                expect(response.allRequestResponses[0]['Response Headers']['content-type'])
                    .contain('text/css');
            })
        cy.request('https://todomvc.com/examples/react/node_modules/todomvc-app-css/index.css')
            .then(response => {
                expect(response.status).be.eq(200)
                expect(response.statusText).be.eq('OK')
                expect(response.isOkStatusCode).be.eq(true)
                expect(response.allRequestResponses[0]['Response Headers']['content-type'])
                    .contain('text/css');
            })
        cy.request('https://todomvc.com/examples/react/js/todoModel.js')
            .then(response => {
                console.log(response);
                expect(response.status).be.eq(200)
                expect(response.statusText).be.eq('OK')
                expect(response.isOkStatusCode).be.eq(true)
                expect(response.allRequestResponses[0]['Response Headers']['content-type'])
                    .contain('application/javascript');
                expect(response.headers.server).be.eq("GitHub.com");
            })
    });
})