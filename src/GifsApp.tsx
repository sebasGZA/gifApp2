import { useState } from "react"

import { mockGifs } from "./mock-data/gifs.mock"
import { CustomHeader } from "./shared/components/CustomHeader"
import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { SearchBar } from "./shared/components/SearchBar"


export const GifsApp = () => {

    const [previousTerms, setPreviousTerms] = useState(['']);
    const handleTermClicked = (term: string) => {
        console.log(term)
    }

    const handleSearch = (query: string = '') => {
        if (!query.trim().toLocaleLowerCase()) return;
        if (previousTerms.includes(query)) return;

        const currentTerms = previousTerms.slice(0, 8);
        currentTerms.unshift(query);
        setPreviousTerms(currentTerms);
    }

    return (
        <>
            <CustomHeader
                title="Search gifs"
                description="Find and share a perfect gif"
            />

            <SearchBar
                placeholder="Search gifs"
                onQuery={handleSearch}
            />

            <PreviousSearches
                searches={previousTerms}
                onLabelClick={handleTermClicked}
            />

            <GifList gifs={mockGifs} />
        </>
    )
}