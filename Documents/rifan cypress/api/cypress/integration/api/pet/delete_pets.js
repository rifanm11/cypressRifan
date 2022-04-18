/// <reference types ="Cypress" />

import {postPets} from "./post_pets";

describe('Given the DELETE Data pets', ()=> {

  context('When I send DELETE pet api', () => {
      it('Then it should delte Pet Data ', () => {

        cy.fixture('data').then((data) => {
          cy.log("pet id is :" + JSON.stringify(data.id))
          const petId = data.id

     cy.request({
      method : 'DELETE',
        url : '/pet/'+petId,
        headers : {
            'accept' : 'application/json'
        },
  }).then((res)=>{
    cy.log(JSON.stringify(res.body))
    expect(res.status).to.eq(200)
    expect(res.body.code).to.eq(200)
    expect(res.body.message).to.eq(petId.toString())
  }).then((res)=>{

    // get request Pet id
    cy.request({
        method : 'GET',
        url : '/pet/' + petId,
        failOnStatusCode: false,
        headers : {
            'accept' : 'application/json'
        }
        
    }).then((res)=>{
      cy.log(JSON.stringify(res.body))
      expect(res.status).to.eq(404)
      expect(res.body.code).to.eq(1)
      expect(res.body.type).to.eq('error')
      expect(res.body.message).to.eq('Pet not found')
        })
})
}) 
})
})

})