import jest from 'jest';
import axios from 'axios';
 jest.mock('axios'); // This overwrites axios methods with jest Mock


describe('Test Apis', () => {
    describe('getResource', () => {
        describe('with success', () => {
            const url = 'https://api.m3o.com/v1/weather/Forecast';
            const onComplete = jest.fn();
            const data = {};

            beforeEach(() => {
                axios.get.mockResolvedValue(data);
            });

            it('should call axios get with given url', () => {
                getResource(url, onComplete);
                expect(axios.post).toBeCalledWith(url);
            });

            it('should call onComplete callback with response', async () => { // do not forget 'async'
                await getResource(url, onComplete); // notice the 'await' because onComplete callback is called in '.then'
                expect(onComplete).toBeCalledWith(data);
            });
        });
    });
});
