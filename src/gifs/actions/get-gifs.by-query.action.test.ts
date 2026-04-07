import { beforeEach, describe, expect, test, vi, } from "vitest";
import { getGifsByQuery } from "./get-gifs-by-query.action";
import AxiosMockAdapter from 'axios-mock-adapter'
import { giphyApi } from "../api/giphy.api";
import { giphySearchResponseMock } from '../../../test/mocks/giphy.response.data'


describe('getGifsByQuery', () => {
    let mock = new AxiosMockAdapter(giphyApi);

    beforeEach(() => {
        mock = new AxiosMockAdapter(giphyApi);
    })

    test('should return a list of gifs', async () => {
        mock.onGet('/search').reply(200, giphySearchResponseMock);
        const gifs = await getGifsByQuery('sun');


        gifs.forEach((gif) => {
            expect(typeof gif.id).toBe('string');
            expect(typeof gif.height).toBe('number');
            expect(typeof gif.width).toBe('number');
            expect(typeof gif.url).toBe('string');
            expect(typeof gif.title).toBe('string');
        })

        expect(gifs.length).toBe(25);
    })

    test('should return an empty list of gifs if query is empty', async () => {
        mock.restore();

        mock.onGet('/search').reply(200, giphySearchResponseMock);
        const gifs = await getGifsByQuery('');
        expect(gifs.length).toBe(0)
    })

    test('Should handle error', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error')
            .mockImplementation(() => { });

        mock.onGet('/search').reply(400, {
            data: {
                message: 'Bad Request'
            }
        })

        const gifs = await getGifsByQuery('sun');
        expect(gifs.length).toBe(0);
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything())
    })
})
