/// <reference types ="Cypress" />

describe('Given the GET for inventory api', ()=> {


    it.only('When GET inventory before', ()=> {

       cy.request({
        method : 'GET',
        url : '/pet/findByStatus?status=available dogs',
        headers : {
            'accept' : 'application/json'
        }
        
    }).then((res)=>{
        expect(res.status).to.eq(200)
        cy.log(JSON.stringify(res.body))
        const petCount = res.body.length
        cy.log(petCount)
        for(let i=0; i< petCount; i++){
            expect(res.body[i].status).to.eq('available dogs')
        }
        })
    })

   
})