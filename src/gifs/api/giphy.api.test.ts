import { describe, expect, test } from "vitest";
import { giphyApi } from "./giphy.api";

describe('giphyApi', () => {
    test('should be configured correctly', () => {
        expect(giphyApi.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs');
        const { params } = giphyApi.defaults;
        
        expect(giphyApi.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs');
        expect(params.lang).toBe('en');
        expect(params.api_key).toBe(import.meta.env.VITE_API_KEY);

        expect(params).toEqual({
            lang: 'en',
            api_key: import.meta.env.VITE_API_KEY,
        });
    })
})