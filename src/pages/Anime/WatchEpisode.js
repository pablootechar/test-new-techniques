import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { CommentCard, Loading, SendComment } from "../../shared/components";
import Api from "../../shared/Api";
import DatabaseApi from "../../shared/DatabaseApi";
// import "../css/WatchEpisode.css"
import CustomVideoPlayer from "./components/CustomVideoPlayer";

export const WatchEpisode = () => {
  const { id: animeId, name, episodeNum } = useParams();
  const [url, setUrl] = useState();
  const [allComments, setAllComments] = useState();
  const [episodeInfos, setEpisodeInfos] = useState();
  const [stateReload, setReloadState] = useState();
  const isPremium = localStorage.getItem("@animatrix/user-premium");


  useEffect(() => {
    async function fetch() {
      const episode = `${name}-episode-${episodeNum}`;
      const episodeLinks = await Api.getStreamingUrl(episode);
      // const animeInfo = await Api.getEpisodes(id);

      if (episodeLinks !== "") {
        episodeLinks.sources?.map((links) => {
          if (links.quality === "1080p") {
            return setUrl(links.url);
          } else {
            return setUrl(links.url);
          }
        });
      }
    }

    async function getEpisodeInfos() {
      const response = await Api.getEpisodes(animeId, 1, episodeNum - 1);
      setEpisodeInfos(response.data[0])
  }

    getEpisodeInfos();
    fetch();
  }, []);
  
  useEffect(() => {
    async function getAllCommentsToTheEpisode() {
      return setAllComments(await DatabaseApi.getComments(animeId, episodeNum));
    }
    
    getAllCommentsToTheEpisode();
  }, [stateReload])

  const redirectToAllEpisodes = () => {
    window.location.href = `/anime-page/all-episodes/${animeId}/${name}`;

  }

  const scrollToBottom = () =>{
    window.scrollTo({
      top: document.documentElement.scrollHeight, 
      behavior: 'smooth'
    });
  };

  const handleSubmit = () => {
    setReloadState((prevState) => !prevState);
    setTimeout(() => {
      scrollToBottom();
    }, 1000)
  };


  return (
    <>
      {typeof url !== "undefined" ? (
        <div className="container-watch responsive">
          <div className="currentEpisode">
            <div className="details-watch">
              {isPremium === "true" ? (
                <ReactPlayer width="100%" height="40%" url={url} controls />
                ) : (
                <CustomVideoPlayer width="100%" height="60%" adVideo="https://youtu.be/INIloHNP8_Q?si=5XNFZ-Pt1flYgnQG" principalVideo={url} controls />
              )}
              <h1>{`S${episodeInfos?.attributes?.seasonNumber}EP${episodeInfos?.attributes?.number} - ${episodeInfos?.attributes?.canonicalTitle}`}</h1>
              <p>{episodeInfos?.attributes?.synopsis}</p>
              <button className="button-watch responsive" onClick={() => redirectToAllEpisodes()}>See All Episodes</button>
            </div>
            <h1>Comments</h1>
            <div className="comments-watch">
              {typeof allComments !== "undefined" ? (
                allComments.map((comment) => {
                  return (
                    <div key={comment.comment_id}>
                      <CommentCard comment={comment} shouldReload={stateReload} />
                    </div>
                  )
                })
              ) : (
                <Loading />
              )}
              <SendComment onCommentSent={handleSubmit} />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
