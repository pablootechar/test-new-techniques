import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { CommentCard, Loading, SendComment } from "../../shared/components";
import Api from "../../shared/Api";
import DatabaseApi from "../../shared/DatabaseApi";
import CustomVideoPlayer from "./components/CustomVideoPlayer";
import styled from "styled-components";
import "./test.css"

const Container = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-bottom: 80px;
`;

const DetailsWatch = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
`;

const AnimeTitle = styled.h1`
  text-align: center;
  margin: 10px 0;
  margin-top: 0;
  font-size: 25px;
  letter-spacing: 3px;
`;

const Synopsis = styled.p`
  text-align: center;
`;

const ButtonShowMore = styled.span`
  color: ${({ theme }) => theme.representativeColor};
  font-weight: bold;
  text-decoration: underline;
  font-style: italic;
  margin-left: 5px;
`;

const AllCommentsDiv = styled.div`
  position: relative;
  margin-bottom: 50px;
`;

export const WatchEpisode = () => {
  const { id: animeId, name, episodeNum } = useParams();
  const [url, setUrl] = useState();
  const [allComments, setAllComments] = useState();
  const [episodeInfos, setEpisodeInfos] = useState();
  const [stateReload, setReloadState] = useState();
  const [showFullSynopsis, setShowFUllSynopsis] = useState(true);
  const [userIsPremium, setUserIsPremium] = useState(false);
  const userInfos = localStorage.getItem("@animatrix/profile") || undefined;
  const playerRef = useRef();

  async function getUserInfo() {
    if (typeof userInfos !== "undefined") {
      const userInfo = await DatabaseApi.getAllUserInfo(JSON.parse(userInfos)?.id);
  
      setUserIsPremium(userInfo?.isPremium === 1 ? true : false);
    } else {
      setUserIsPremium(false);
    }

  }

  useEffect(() => {
    getUserInfo();
    async function fetch() {
      const episode = `${name}-episode-${episodeNum}`;
      const episodeLinks = await Api.getStreamingUrl(episode);

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
      setEpisodeInfos(response.data[0]);
    }

    getEpisodeInfos();
    fetch();
  }, []);

  useEffect(() => {
    async function getAllCommentsToTheEpisode() {
      return setAllComments(await DatabaseApi.getComments(animeId, episodeNum));
    }

    getAllCommentsToTheEpisode();
  }, [stateReload]);

  const redirectToAllEpisodes = () => {
    window.location.href = `/anime-page/all-episodes/${animeId}/${name}`;
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleSubmit = () => {
    setReloadState((prevState) => !prevState);
    setTimeout(() => {
      scrollToBottom();
    }, 1000);
  };

  function replaceText(synopsis) {
    const replacedText = synopsis?.substring(0, 300);
    return replacedText?.length >= 300 ? replacedText + "..." : replacedText;
  }


  return typeof url !== "undefined" ? (
    <Container>
      {userIsPremium === true ? (
        <ReactPlayer width="100%" height="40%" url={url} controls ref={playerRef} />
      ) : (
        <CustomVideoPlayer
          width="100%"
          height="60%"
          adVideo="https://youtu.be/INIloHNP8_Q?si=5XNFZ-Pt1flYgnQG"
          principalVideo={url}
          playing
        />
      )}
      <DetailsWatch>
        <AnimeTitle>{`S${episodeInfos?.attributes?.seasonNumber}EP${episodeInfos?.attributes?.number} - ${episodeInfos?.attributes?.canonicalTitle}`}</AnimeTitle>
        {episodeInfos?.attributes?.synopsis?.length < 300 ? (
          <Synopsis>{episodeInfos?.attributes?.synopsis}</Synopsis>
        ) : showFullSynopsis ? (
          <Synopsis>
            {replaceText(episodeInfos?.attributes?.synopsis)}
            <ButtonShowMore
              onClick={() => setShowFUllSynopsis(!showFullSynopsis)}
            >
              Show more.
            </ButtonShowMore>
          </Synopsis>
        ) : (
          <Synopsis>
            {episodeInfos?.attributes?.synopsis}
            <ButtonShowMore
              onClick={() => setShowFUllSynopsis(!showFullSynopsis)}
            >
              Show less.
            </ButtonShowMore>
          </Synopsis>
        )}
        {/* <h1>{`S${episodeInfos?.attributes?.seasonNumber}EP${episodeInfos?.attributes?.number} - ${episodeInfos?.attributes?.canonicalTitle}`}</h1>
        <p>{episodeInfos?.attributes?.synopsis}</p> */}
        {/* <button
          className="button-watch responsive"
          onClick={() => redirectToAllEpisodes()}
        >
          See All Episodes
        </button> */}
      </DetailsWatch>
      <h1>All comments</h1>
      <AllCommentsDiv>
      <SendComment onCommentSent={handleSubmit} />
        {typeof allComments !== "undefined" ? (
          allComments.map((comment) => {
            return (
              <div key={comment.comment_id}>
                <CommentCard comment={comment} shouldReload={stateReload} />
              </div>
            );
          })
        ) : (
          <Loading />
        )}
        
      </AllCommentsDiv>
    </Container>
  ) : (
    <Loading />
  );
};
