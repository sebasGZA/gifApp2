import { giphyApi } from '../api/giphy.api';

import type { GiphyResponse } from '../interfaces/giphy.response';
import type { Gif } from '../interfaces/gif.interface';

export const getGifsByQuery = async (query: string): Promise<Gif[]> => {

    try {
        if (query.trim().length === 0) return []

        const { data } = await giphyApi.get<GiphyResponse>(
            '/search', {
            params: {
                q: query,
                limit: 10,
            },
        });

        return data.data.map(({ id, title, images }) => ({
            id,
            title,
            url: images.original.url,
            height: +images.original.height,
            width: +images.original.width,
        }));
    } catch (err) {
        console.error(err);
        return [];
    }
}