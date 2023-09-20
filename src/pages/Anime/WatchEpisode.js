import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import {
  CommentCard,
  Loading,
  MessageModal,
  SendComment,
} from "../../shared/components";
import Api from "../../shared/Api";
import DatabaseApi from "../../shared/DatabaseApi";
import CustomVideoPlayer from "./components/CustomVideoPlayer";
import styled from "styled-components";
import "./test.css";

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
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState();
  const userInfos = localStorage.getItem("@animatrix/profile") || undefined;
  const playerRef = useRef();

  async function getUserInfo() {
    if (typeof userInfos !== "undefined") {
      const userInfo = await DatabaseApi.getAllUserInfo(
        JSON.parse(userInfos)?.id
      );

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

      if (episodeLinks === "Unable to get link") {
        setError(episodeLinks);
      }

      if (episodeLinks !== "" && episodeLinks !== "Unable to get link") {
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

    const handleOrientationChange = () => {
      const isLandscape =
        window.innerWidth > window.innerHeight && !document.fullscreenElement;
      console.log(isLandscape);

      if (isLandscape) {
        // Se o dispositivo está em orientação paisagem, ative o modo tela cheia
        playerRef.current?.player?.requestFullscreen();
      }
    };

    // Adicionar um ouvinte para o evento de mudança de orientação
    window.addEventListener("orientationchange", handleOrientationChange);

    getAllCommentsToTheEpisode();

    return () => {
      // Limpar o ouvinte quando o componente for desmontado
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, [stateReload]);

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

  return typeof url !== "undefined" || error === "Unable to get link" ? (
    error === "Unable to get link" ? (
      <h1>It was not possible to obtain the episodes for this anime at the moment</h1>
    ) : (
      <Container>
        {showModal && (
          <MessageModal
            typeMessage="error"
            textMessage="You need to login to post a comment!"
            modalState={showModal}
            handleStateOfModal={setShowModal}
          />
        )}
        {userIsPremium === true ? (
          <ReactPlayer
            ref={playerRef}
            width="100%"
            height="40%"
            url={url}
            controls
          />
        ) : (
          <CustomVideoPlayer
            width="100%"
            height="60%"
            adVideo="https://www.youtube.com/embed/INIloHNP8_Q?si=xmgdnKn2x9XMY6f9"
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
          <SendComment
            onCommentSent={handleSubmit}
            showModal={showModal}
            setShowModal={setShowModal}
          />
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
    )
  ) : (
    <Loading />
  );
};
