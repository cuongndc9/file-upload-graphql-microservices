import * as order_service from "src/services/order.service"
import * as constants from "src/components/constants"
// @ponicode
describe("order_service.default.getOrders", () => {
    test("0", () => {
        let callFunction: any = () => {
            order_service.default.getOrders()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("order_service.default.getOrder", () => {
    test("0", () => {
        let callFunction: any = () => {
            order_service.default.getOrder("7289708e-b17a-477c-8a77-9ab575c4b4d8")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            order_service.default.getOrder("03ea49f8-1d96-4cd0-b279-0684e3eec3a9")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            order_service.default.getOrder("a85a8e6b-348b-4011-a1ec-1e78e9620782")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            order_service.default.getOrder("")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("order_service.default.createOrder", () => {
    test("0", () => {
        let callFunction: any = () => {
            order_service.default.createOrder({ total: 10000, finalTotal: 0, status: constants.OrderStatus.Done })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            order_service.default.createOrder({ total: 10000, finalTotal: 300, status: constants.OrderStatus.Done })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            order_service.default.createOrder({ total: 10000, finalTotal: 0, status: constants.OrderStatus.InProcess })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            order_service.default.createOrder({ total: 6.0, finalTotal: 0, status: constants.OrderStatus.InProcess })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            order_service.default.createOrder({ total: 0, finalTotal: 0, status: constants.OrderStatus.InProcess })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            order_service.default.createOrder({ total: NaN, finalTotal: NaN, status: constants.OrderStatus.InProcess })
        }
    
        expect(callFunction).not.toThrow()
    })
})
