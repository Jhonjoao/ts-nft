import { Response } from "express";

export default class FakeExpress {

    constructor(req: any) {
        this.req = req;
    }
    
    res: Partial<Response> = {
        statusCode: 200,
        send: jest.fn().mockImplementation(({status, message}) => {
            this.res.status = status;
            this.res.statusMessage = message
            return this.res;
        }),
        status: jest.fn().mockImplementation((code) => {
            this.res.statusCode = code;
            return this.res;
        }),
        json: jest.fn().mockImplementation((param) => {
            this.responseData = param;
            return this.res;
            }),
    }

    req: any;
    responseData: any;

}