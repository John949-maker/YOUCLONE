import React from 'react'
import './Video.css'
import PlayVideo from '../../Components/PlayVideo/PlayVideo'
import Recommended from '../../Components/Recommended/Recommended'
import { useParams } from 'react-router-dom'

const Video = ({darkMode}) => {

  const {videoId,categoryId} = useParams();

  return (
    <div className='play-container' style={{background: darkMode ? "black" : ""}}>
      <PlayVideo darkMode={darkMode} videoId={videoId}/>
      <Recommended categoryId={categoryId} darkMode={darkMode}/>
    </div>
  )
}

export default Video
