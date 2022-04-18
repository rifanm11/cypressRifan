/// <reference types ="Cypress" />

describe('Given the POST for Create User api', ()=> {
  let randomText = ""
  let testEmail = ""

    let randomNumber = `${Math.floor(Math.random() * 1000)}`
    let randomPhone = '08110001'+randomNumber
    var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    randomText+=pattern.charAt(Math.floor(Math.random() * pattern.length));
    testEmail = randomNumber + randomText + '@gmail.com'

    context('When I send POST Create User Api', () => {
    it('Then it should show the data from GET by Username', ()=> {

       cy.request({
        method : 'POST',
        url : '/user',
        headers : {
            'accept' : 'application/json'
        },
        body : 
        {
          "id": randomNumber,
          "username": "UserTest " + randomText + randomNumber,
          "firstName": "UserTest",
          "lastName": randomText + randomNumber,
          "email": testEmail,
          "password": "Password",
          "phone": randomPhone,
          "userStatus": 0
        }
        
    }).then((res)=>{
        cy.log(JSON.stringify(res.body))
        cy.log("Username is : UserTest" + randomText)
        expect(res.status).to.eq(200)
        expect(res.body.code).to.eq(200)
        expect(res.body.message).to.eq(randomNumber)
        }).then((res)=>{
            const Username = "UserTest " + randomText + randomNumber
            cy.log("Username is : UserTest " + randomText + randomNumber)

            // get request user by username
            cy.request({
                method : 'GET',
                url : '/user/' + Username,
                headers : {
                    'accept' : 'application/json'
                }
                
            }).then((res)=>{
                cy.log(JSON.stringify(res.body))
                expect(res.status).to.eq(200)
                expect(res.body.id).to.eq(parseInt(randomNumber))
                expect(res.body.username).to.eq(Username)
                expect(res.body.firstName).to.eq('UserTest')
                expect(res.body.lastName).to.eq(randomText + randomNumber)
                expect(res.body.email).to.eq(testEmail)
                expect(res.body.password).to.eq('Password')
                expect(res.body.phone).to.eq(randomPhone)
                expect(res.body.userStatus).to.eq(0)
                cy.writeFile('cypress/fixtures/data.json', res.body)
                })
        })
    }) 
})

})