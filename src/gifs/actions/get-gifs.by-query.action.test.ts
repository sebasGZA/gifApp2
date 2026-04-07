import { describe, expect, test } from "vitest";
import { getGifsByQuery } from "./get-gifs-by-query.action";
import AxiosMockAdapter from 'axios-mock-adapter'
import { giphyApi } from "../api/giphy.api";
import { giphySearchResponseMock } from '../../../test/mocks/giphy.response.data'


describe('getGifsByQuery', () => {
    const mock = new AxiosMockAdapter(giphyApi);
    // test('should ', async () => {
    //     const gifs = await getGifsByQuery('sun')
    //     const [gif1] = gifs;

    //     expect(gif1).toStrictEqual({
    //         id: expect.any(String),
    //         height: expect.any(Number),
    //         width: expect.any(Number),
    //         title: expect.any(String),
    //         url: expect.any(String),
    //     })
    // });

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
})
