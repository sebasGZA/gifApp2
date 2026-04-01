import { useEffect, useState, type KeyboardEvent } from "react";

interface Props {
    onQuery: (query: string) => void;
    placeholder?: string;
}

export const SearchBar = ({ placeholder, onQuery }: Props) => {

    const [query, setQuery] = useState('');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onQuery(query);
        }, 700)
        
        return () => {
            clearTimeout(timeoutId);
        }
    }, [query, onQuery])

    const handleSearch = () => onQuery(query);
    const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') handleSearch();
    }

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleEnter}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}