import { CustomHeader } from "./shared/components/CustomHeader"
import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { SearchBar } from "./shared/components/SearchBar"
import { useGifs } from "./gifs/hooks/useGifs"

export const GifsApp = () => {

    const {
        gifs,
        previousTerms,
        handleSearch,
        handleTermClicked
    } = useGifs()

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

            <GifList gifs={gifs} />
        </>
    )
}