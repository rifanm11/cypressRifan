/// <reference types ="Cypress" />

import {postUser} from "./post_create_user";

describe('Given the UPDATE Data pets', ()=> {

  context('When I send UPDATE pets', () => {
      it('Then it should  show data with new update in GET Pets', () => {

        cy.fixture('data').then((data) => {
          cy.log("Username is :" + JSON.stringify(data.id))
          const userId = data.id
          const username = data.username
          const firstName = data.firstName
          const lastname = data.lastname
          const email = data.email
          const password = data.password
          const phone = data.phone

     cy.request({
      method : 'PUT',
        url : '/user/'+username,
        headers : {
            'accept' : 'application/json'
        },
        body : 
        {
          "id": userId,
          "username": "Update " + username,
          "firstName": "Update " + firstName,
          "lastName": "Update " + lastname,
          "email": "Update" + email,
          "password": "Password",
          "phone": phone,
          "userStatus": 1
        }
      
  }).then((res)=>{
      cy.log(JSON.stringify(res.body))
      expect(res.status).to.eq(200)
      expect(res.body.message).to.eq(userId.toString())
  }).then((res)=>{

    // get request user after update
    cy.request({
        method : 'GET',
        url :  '/user/' + 'Update ' + username,
        headers : {
            'accept' : 'application/json'
        }
        
    }).then((res)=>{
        cy.log(JSON.stringify(res.body))
      expect(res.status).to.eq(200)
      expect(res.body.id).to.eq(parseInt(userId))
      expect(res.body.username).to.eq("Update " + username)
      expect(res.body.firstName).to.eq("Update " + firstName)
      expect(res.body.lastName).to.eq("Update " + lastname)
      expect(res.body.email).to.eq("Update" + email)
      expect(res.body.password).to.eq(password)
      expect(res.body.phone).to.eq(phone)
      expect(res.body.userStatus).to.eq(1)
        })
      })
})
}) 
})

})