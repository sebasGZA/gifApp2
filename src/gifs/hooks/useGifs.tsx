import { useState } from "react";

import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";

export const useGifs = () => {
    const [gifs, setGifs] = useState<Gif[]>([]);
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);

    const handleTermClicked = async (term: string) => {
        const gifs = await getGifsByQuery(term);
        setGifs(gifs);
    }

    const handleSearch = async (query: string = '') => {
        if (!query.trim().toLocaleLowerCase()) return;
        if (previousTerms.includes(query)) return;

        const currentTerms = previousTerms.slice(0, 8);
        currentTerms.unshift(query);
        setPreviousTerms(currentTerms);

        const gifs = await getGifsByQuery(query);
        setGifs(gifs);
    }

    return {
        gifs,
        previousTerms,
        handleTermClicked,
        handleSearch
    }
}