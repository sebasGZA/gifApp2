import { mockGifs } from "./mock-data/gifs.mock"

export const GifsApp = () => {
    return (
        <>
            <div className="content-center">
                <h1>Search gifs</h1>
                <p>Find and share a perfect gif</p>
            </div>

            <div className="search-container">
                <input type="text" placeholder="Search gifs" />
                <button>Search</button>
            </div>

            <div className="previous-searches">
                <h2>Previous search</h2>
                <ul className="previous-searches-list">
                    <li>Goku</li>
                    <li>Saitama</li>
                    <li>Elder ring</li>
                </ul>
            </div>

            <div className="gifs-container">
                {mockGifs.map((gif) => (
                    <div key={gif.id} className="gif-card">
                        <img src={gif.url} alt={gif.title}/>
                        <h3>{gif.title}</h3>
                        <p>
                            {gif.width}*{gif.height} (1.5mb)
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}