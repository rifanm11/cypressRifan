/// <reference types ="Cypress" />

describe('Given the POST Order api', ()=> {

    // let BASE_URL = 'https://petstore.swagger.io/v2'
    let randomNumber = `${Math.floor(Math.random() * 100)}`
    const dayjs = require('dayjs');
    const todaysDate = new Date();
    const actualDate = dayjs(todaysDate, 'MM/DD/YYYY').toDate();


    context('When I send POST order', () => {
    it('Then it should show the GET order Api', ()=> {

       cy.request({
        method : 'POST',
        url : '/store/order',
        headers : {
            'accept' : 'application/json'
        },
        body : 
        {
         "id": randomNumber,
         "petId": randomNumber,
         "quantity": randomNumber,
         "shipDate": actualDate,
         "status": "Available",
         "complete": true
       }
        
    }).then((res)=>{
        cy.log(JSON.stringify(res.body))
        expect(res.status).to.eq(200)
        expect(res.body.id).to.eq(parseInt(randomNumber))
        expect(res.body.petId).to.eq(parseInt(randomNumber))
        expect(res.body.quantity).to.eq(parseInt(randomNumber))
        const shipdate = dayjs(res.body.shipDate, 'MM/DD/YYYY').toDate();
        expect(shipdate).to.lte(actualDate)
        expect(res.body.status).to.eq('Available')
        expect(res.body.complete).to.eq(true)
        }).then((res)=>{
            const orderId = res.body.id
            cy.log("order id is :" + orderId)

            // get request order id
            cy.request({
                method : 'GET',
                url : '/store/order/' + orderId,
                headers : {
                    'accept' : 'application/json'
                }
                
            }).then((res)=>{
                cy.log(JSON.stringify(res.body))
                cy.writeFile('cypress/fixtures/data.json', res.body)
                expect(res.status).to.eq(200)
                expect(res.body.id).to.eq(parseInt(orderId))
                expect(res.body.petId).to.eq(parseInt(randomNumber))
                expect(res.body.quantity).to.eq(parseInt(randomNumber))
                expect(res.body.status).to.eq('Available')
                expect(res.body.complete).to.eq(true)
                const shipdate = dayjs(res.body.shipDate, 'MM/DD/YYYY').toDate();
                expect(shipdate).to.lte(actualDate)
                })
        })
    }) 
})

})