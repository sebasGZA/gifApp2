import { useRef, useState } from "react";

import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";

//const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
    const [gifs, setGifs] = useState<Gif[]>([]);
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);

    const gifsCache = useRef<Record<string, Gif[]>>({});

    const handleTermClicked = async (term: string) => {
        if (gifsCache.current[term]) {
            setGifs(gifsCache.current[term]);
            return;
        }
        const gifs = await getGifsByQuery(term);
        setGifs(gifs);
        gifsCache.current[term] = gifs;

    }

    const handleSearch = async (term: string = '') => {
        if (!term.trim().toLocaleLowerCase()) return;
        if (previousTerms.includes(term)) return;

        const currentTerms = previousTerms.slice(0, 7);
        currentTerms.unshift(term);
        setPreviousTerms(currentTerms);

        const gifs = await getGifsByQuery(term);
        setGifs(gifs);

        gifsCache.current[term] = gifs;
    }

    return {
        gifs,
        previousTerms,
        handleTermClicked,
        handleSearch
    }
}