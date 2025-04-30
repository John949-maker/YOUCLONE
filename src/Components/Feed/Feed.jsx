import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Feed.css';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';

const Feed = ({ category, darkMode }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=16&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
        const response = await fetch(videoList_url);
        const result = await response.json();
        setData(result.items || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchData();
  }, [category]);

  return (

    <div className="feed" style={{ color: darkMode ? "white" : "black", background: darkMode ? "black" : "white" }}>
      {data.map((item, index) => {
        return (
          <Link to={`video/${item.snippet.categoryId}/${item.id}`} className="card">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <h2 style={{ color: darkMode ? "white" : "black" }}>{item.snippet.title}</h2>
            <h3 style={{ color: darkMode ? "white" : "black" }}>{item.snippet.channelTitle}</h3>
            <p style={{ color: darkMode ? "white" : "black" }}>
              {value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}
            </p>

          </Link>
        )
      })}


    </div>
  );
};

export default Feed;

