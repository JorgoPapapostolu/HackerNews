import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await axios.get(
          `http://hn.algolia.com/api/v1/search_by_date?tags=story`,
        );
        setNews(response.data.hits);
      } catch (error) {
        console.log(error);
      }
    };
    getNews();
  }, []);

  const getNews = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${search}`,
      );
      setNews(response.data.hits);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <div className="header">
        <h1 className="headline">Hacker News</h1>
        <form className="search" onSubmit={getNews}>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleInputChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="news-list">
        <ul className="numberList">
          {news.map((item, index) => (
            <li key={item.objectID} className="news-item">
              <div className="news-title">
                {index + 1}.{" "}
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              </div>

              <div className="news-details">
                <span>{item.points} points </span>
                <span>by {item.author}</span>
                <span>{item.num_comments} comments</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
