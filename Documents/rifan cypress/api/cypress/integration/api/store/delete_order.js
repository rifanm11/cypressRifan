/// <reference types ="Cypress" />
import {test} from "./post_order";

describe('Given the DELETE Order api', ()=> {

    context('When I send DELETE order', () => {
        it('Then it should not show data ID in GET order Api', () => {

            cy.fixture('data').then((data) => {
                cy.log("order id is :" + JSON.stringify(data.id))
                const OrderId = data.id

       cy.request({
        method : 'DELETE',
        url : '/store/order/'+OrderId,
        headers : {
            'accept' : 'application/json'
        },
        
    }).then((res)=>{
        cy.log(JSON.stringify(res.body))
        expect(res.status).to.eq(200)
        expect(res.body.code).to.eq(200)
        expect(res.body.message).to.eq(OrderId.toString())
    }).then((res)=>{

            // get request order id already deleted
            cy.request({
                method : 'GET',
                url : '/store/order/' + OrderId,
                failOnStatusCode: false,
                headers : {
                    'accept' : 'application/json'
                }
                
            }).then((res)=>{
                cy.log(JSON.stringify(res.body))
                expect(res.status).to.eq(404)
                expect(res.body.code).to.eq(1)
                expect(res.body.type).to.eq('error')
                expect(res.body.message).to.eq('Order not found')
                })
        })
    }) 
})

})

})