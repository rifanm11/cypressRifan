/// <reference types ="Cypress" />

import {postPets} from "./post_pets";

describe('Given the UPDATE Data pets', ()=> {

  context('When I send UPDATE pets', () => {
      it('Then it should  show data with new update in GET Pets', () => {

        cy.fixture('data').then((data) => {
          cy.log("PET id is :" + JSON.stringify(data.id))
          const petId = data.id

     cy.request({
      method : 'PUT',
        url : '/pet',
        headers : {
            'accept' : 'application/json'
        },
        body : 
        {
            "id": petId,
            "category": {
              "id": 1,
              "name": "dogs update" + petId
            },
            "name": "doggie" + petId,
            "photoUrls": [
              "string"
            ],
            "tags": [
              {
                "id": 1,
                "name": "dogs update" + petId
              }
            ],
            "status": "available update"
          }
      
  }).then((res)=>{
      cy.log(JSON.stringify(res.body))
      expect(res.status).to.eq(200)
      expect(res.body.id).to.eq(parseInt(petId))
      expect(res.body.category.id).to.eq(1)
      expect(res.body.category.name).to.eq('dogs update' + petId)
      expect(res.body.name).to.eq("doggie" + petId)
      expect(res.body.tags[0].id).to.eq(1)
      expect(res.body.tags[0].name).to.eq('dogs update' + petId)
      expect(res.body.status).to.eq('available update')
  })}).then((res)=>{
    const petId = res.body.id
    cy.log("pet id is :" + petId)

    // get request order id
    cy.request({
        method : 'GET',
        url : '/pet/' + petId,
        headers : {
            'accept' : 'application/json'
        }
        
    }).then((res)=>{
        cy.log(JSON.stringify(res.body))
        expect(res.status).to.eq(200)
        expect(res.body.id).to.eq(parseInt(petId))
        expect(res.body.category.id).to.eq(1)
        expect(res.body.category.name).to.eq('dogs update' + petId)
        expect(res.body.name).to.eq("doggie" + petId)
        expect(res.body.tags[0].id).to.eq(1)
        expect(res.body.tags[0].name).to.eq('dogs update' + petId)
        expect(res.body.status).to.eq('available update')
        })
})
}) 
})

})