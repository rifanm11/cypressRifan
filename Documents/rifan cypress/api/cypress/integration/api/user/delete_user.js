/// <reference types ="Cypress" />

import {postPets} from "./post_create_user";

describe('Given the DELETE Data User', ()=> {

  context('When I send DELETE User api', () => {
      it('Then it should delete user Data ', () => {

        cy.fixture('data').then((data) => {
          cy.log("user name is :" + JSON.stringify(data.username))
          const username = data.username

     cy.request({
      method : 'DELETE',
        url : '/user/'+username,
        headers : {
            'accept' : 'application/json'
        },
  }).then((res)=>{
    cy.log(JSON.stringify(res.body))
    expect(res.status).to.eq(200)
    expect(res.body.code).to.eq(200)
    expect(res.body.message).to.eq(username.toString())
  }).then((res)=>{

    // get request user name
    cy.request({
        method : 'GET',
        url : '/user/' + username,
        failOnStatusCode: false,
        headers : {
            'accept' : 'application/json'
        }
        
    }).then((res)=>{
      cy.log(JSON.stringify(res.body))
      expect(res.status).to.eq(404)
      expect(res.body.code).to.eq(1)
      expect(res.body.type).to.eq('error')
      expect(res.body.message).to.eq('User not found')
        })
})
}) 
})
})

})