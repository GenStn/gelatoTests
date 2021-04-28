let faker = require('faker')
function generateEmployees () {
    let employees = []
    for (let id = 0; id < 50; id++) {
        let firstName = faker.name.firstName()
        let lastName = faker.name.lastName()
        let email = faker.internet.email()
        employees.push({
            "id": id,
            "first_name": firstName,
            "last_name": lastName,
            "email": email
        })
    }
    return { "employees": employees }
}
module.exports = generateEmployees
