/// <reference types ="Cypress" />

describe('Given the GET for inventory api', ()=> {

    let randomNumber = `${Math.floor(Math.random() * 1000)}`


    it('When GET inventory before', ()=> {

       cy.request({
        method : 'GET',
        url : '/store/inventory',
        headers : {
            'accept' : 'application/json'
        }
        
    }).then((res)=>{
        expect(res.status).to.eq(200)
        const get_response = res.body
        cy.log("available dogs count before us :" + JSON.stringify(get_response))
        cy.writeFile('cypress/fixtures/data.json', get_response)
        })
    })

    it('And POST new pet stock for add inventory', ()=> {

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
            })
        })


    it('Then GET inventory for checking add status', ()=> {

        cy.request({
         method : 'GET',
         url : '/store/inventory',
         headers : {
             'accept' : 'application/json'
         }
         
     }).then((res)=>{
         expect(res.status).to.eq(200)
         cy.fixture('data').then((data) => {
            cy.log(JSON.stringify(res.body))
            cy.log("order id is :" + JSON.stringify(data["available dogs"]))
            const available_before = data["available dogs"]
            const available_dogs = (available_before + 1)
            cy.log("available dogs count before us :" + available_dogs)
            expect(res.body["available dogs"]).to.eq(parseInt(available_dogs))
         })
     })
    })
 


})