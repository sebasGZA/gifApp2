import { mockGifs } from "./mock-data/gifs.mock"
import { CustomHeader } from "./shared/components/CustomHeader"
import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { SearchBar } from "./shared/components/SearchBar"

export const GifsApp = () => {
    return (
        <>
            <CustomHeader
                title="Search gifs"
                description="Find and share a perfect gif"
            />

            <SearchBar placeholder="Search gifs" />

            <PreviousSearches />

            <GifList gifs={mockGifs} />
        </>
    )
}