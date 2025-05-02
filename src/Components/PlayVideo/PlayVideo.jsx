import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import user_profile from '../../assets/user_profile.jpg';
import { value_converter } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next"

const API_KEY = "AIzaSyArSVn7PRgf3YgqHHccB07UwL-GXtWVcqs";

const PlayVideo = ({darkMode}) => {
  const { t } = useTranslation()
  const { videoId } = useParams();

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [comments, setComments] = useState([]);

  const fetchVideoData = async () => {
    try {
      const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
      const res = await fetch(videoDetails_url);
      const data = await res.json();
      const videoInfo = data.items[0];
      setApiData(videoInfo);

      if (videoInfo && videoInfo.snippet.channelId) {
        fetchChannelData(videoInfo.snippet.channelId);
      }
    } catch (error) {
      console.error("Xatolik video ma'lumotini olishda:", error);
    }
  };

  const fetchChannelData = async (channelId) => {
    try {
      const channelDetails_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`;
      const res = await fetch(channelDetails_url);
      const data = await res.json();
      setChannelData(data.items[0]);
    } catch (error) {
      console.error("Xatolik kanal ma'lumotini olishda:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const comments_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}&maxResults=10`;
      const res = await fetch(comments_url);
      const data = await res.json();
      setComments(data.items);
    } catch (error) {
      console.error("Xatolik izohlarni olishda:", error);
    }
  };

  useEffect(() => {
    fetchVideoData();
    fetchComments();
  }, [videoId]);

  return (
    <div className='play-video'>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={apiData?.snippet?.title || 'Video'}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>

      <h3>{apiData?.snippet?.title || 'Yuklanmoqda...'}</h3>

      <div className="play-video-info">
        <p style={{color: darkMode ? "white" : ""}}>
          {apiData ? value_converter(apiData.statistics.viewCount) : '0'} Views &bull;{' '}
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ''}
        </p>
        <div style={{color: darkMode ? "white" : ""}}>
          <span><img src={like} alt="like" /> {apiData ? value_converter(apiData.statistics.likeCount || 0) : '0'}</span>
          <span><img src={dislike} alt="dislike" /> 2</span>
          <span><img src={share} alt="share" /> {t("share")}</span>
          <span><img src={save} alt="save" /> {t("download")}</span>
        </div>
      </div>

      <hr />

      <div style={{color: darkMode ? "white" : ""}} className="publisher">
        <img src={channelData?.snippet?.thumbnails?.default?.url || ''} alt="channel" />
        <div style={{color: darkMode ? "white" : ""}}>
          <p style={{color: darkMode ? "white" : ""}}>{channelData?.snippet?.title || 'Channel nomi'}</p>
          <span style={{color: darkMode ? "white" : ""}}>{channelData ? value_converter(channelData.statistics.subscriberCount) : "0"} {t("followers")}</span>
        </div>
        <button>{t("subscribe")}</button>
      </div>

      <div style={{color: darkMode ? "white" : ""}} className="vid-description">
        <p style={{color: darkMode ? "white" : ""}}>{t("vid_description")}</p>
        <p style={{color: darkMode ? "white" : ""}}>{t("read_more")}</p>
        <hr />
        <h4 style={{color: darkMode ? "white" : ""}}>{comments.length} {t("comment")}</h4>

        {comments.map((commentItem, i) => {
          const comment = commentItem.snippet.topLevelComment.snippet;
          return (
            <div className="comment" key={i}>
              <img src={comment.authorProfileImageUrl || user_profile} alt="user" />
              <div style={{color: darkMode ? "white" : ""}}>
                <h3 style={{color: darkMode ? "white" : ""}}>{comment.authorDisplayName} <span>{moment(comment.publishedAt).fromNow()}</span></h3>
                <p style={{color: darkMode ? "white" : ""}}>{comment.textDisplay}</p>
                <div style={{color: darkMode ? "white" : ""}} className="comment-action">
                  <img src={like} alt="like" />
                  <span style={{color: darkMode ? "white" : ""}}>{value_converter(comment.likeCount || 0)}</span>
                  <img src={dislike} alt="dislike" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayVideo;
