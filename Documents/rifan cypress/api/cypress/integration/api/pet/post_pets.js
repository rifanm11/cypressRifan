/// <reference types ="Cypress" />

describe('Given the POST Pet api', ()=> {

    let randomNumber = `${Math.floor(Math.random() * 100)}`

    context('When I send POST Pet Api', () => {
    it('Then it should show the GET Pets Api', ()=> {

       cy.request({
        method : 'POST',
        url : '/pet',
        headers : {
            'accept' : 'application/json'
        },
        body : 
        {
            "id": randomNumber,
            "category": {
              "id": 1,
              "name": "dogs"
            },
            "name": "doggie" + randomNumber,
            "photoUrls": [
              "string"
            ],
            "tags": [
              {
                "id": 1,
                "name": "dogs"
              }
            ],
            "status": "available dogs"
          }
        
    }).then((res)=>{
        cy.log(JSON.stringify(res.body))
        expect(res.status).to.eq(200)
        expect(res.body.id).to.eq(parseInt(randomNumber))
        expect(res.body.category.id).to.eq(1)
        expect(res.body.category.name).to.eq('dogs')
        expect(res.body.name).to.eq("doggie" + randomNumber)
        expect(res.body.tags[0].id).to.eq(1)
        expect(res.body.tags[0].name).to.eq('dogs')
        expect(res.body.status).to.eq('available dogs')
        }).then((res)=>{
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
                cy.writeFile('cypress/fixtures/data.json', res.body)
                expect(res.status).to.eq(200)
                expect(res.body.id).to.eq(parseInt(randomNumber))
                expect(res.body.category.id).to.eq(1)
                expect(res.body.category.name).to.eq('dogs')
                expect(res.body.name).to.eq("doggie" + randomNumber)
                expect(res.body.tags[0].id).to.eq(1)
                expect(res.body.tags[0].name).to.eq('dogs')
                expect(res.body.status).to.eq('available dogs')
                })
        })
    }) 
})

})