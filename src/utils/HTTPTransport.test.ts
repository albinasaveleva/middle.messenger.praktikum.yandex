import { expect, use } from "chai";
import sinonChai from 'sinon-chai';
import { createSandbox, SinonStub } from 'sinon';
import { HTTPTransport } from './HTTPTransport';

describe('HTTP Transport', () => {
    use(sinonChai);
    const sandbox = createSandbox();
    let http: HTTPTransport;
    let request: SinonStub<any>;

    beforeEach(() => {
        http = new HTTPTransport();
        request = sandbox.stub(http, 'request' as keyof typeof http).callsFake(() => Promise.reject())
    })

    afterEach(() => {
        sandbox.restore();
    })

    it('should do GET request', async () => {
        const url: string = '';

        http.get(url);
        expect(request).calledWithMatch(url, {method: 'GET'});
    });

    it('should do POST request', async () => {
        const url: string = '';
        const options: { [key: string]: any } = {
            options: {}
        };

        http.post(url, options);
        expect(request).calledWithMatch(url, { options: {}, method: 'POST'});
    });

    it('should do PUT request', async () => {
        const url: string = '';
        const options: { [key: string]: any } = {
            options: {}
        };

        http.put(url, options);
        expect(request).calledWithMatch(url, { options: {}, method: 'PUT'});
    });

    it('should do DELETE request', async () => {
        const url: string = '';
        const options: { [key: string]: any } = {
            options: {}
        };

        http.delete(url, options);
        expect(request).calledWithMatch(url, { options: {}, method: 'DELETE'});
    });
})
