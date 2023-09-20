import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Api from "../../shared/Api";
import { Loading, AnimeOrMangaCard } from "../../shared/components";
import { styled } from "styled-components";
import { shade } from "polished";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #000;
  overflow-x: hidden;
  padding-bottom: 50px;
`;

const InfoOfAnime = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 84%;
  margin: 20px 8%;
  align-items: center;
  flex-wrap: wrap;
`;

const EpisodeList = styled.div`
  position: relative;
  padding: 12px;
`;

const ImageOfAnime = styled.img`
  height: 300px;
  max-width: 65%;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.representativeColor};
  padding: 3px;
`;

const AnimeDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AnimeTitle = styled.h1`
  text-align: center;
  margin: 10px 0;
  font-size: 45px;
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

const ButtonSeeAllEpisodes = styled.button`
  padding: 10px;
  color: #f5f5f5;
  border-radius: 8px;
  background: ${({ theme }) => shade(0.1, theme.representativeColor)};
  font-size: 18px;
  border: none;
  width: 100%;

  &:hover {
    background: ${({ theme }) => theme.representativeColor};
  }
`;

export const AnimeInfo = () => {
  const [allEpisodes, setAllEpisodes] = useState();
  const [animeInfo, setAnimeInfo] = useState();
  const { id, name } = useParams();
  const [showFullSynopsis, setShowFUllSynopsis] = useState(true);
  let i = 0;

  useEffect(() => {
    async function request() {
      const episodes = await Api.getEpisodes(id, 20);
      setAllEpisodes(episodes.data);
      const info = await Api.getInfoByKitsu(id);
      setAnimeInfo(info.data);
    }

    request();
  }, []);

  const redirectToAllEpisodes = () => {
    window.location.href = `/anime-page/all-episodes/${id}/${name}`;
  };

  function replaceText(synopsis) {
    const replacedText = synopsis?.substring(0, 300);
    return replacedText?.length >= 300 ? replacedText + "..." : replacedText;
  };

  const aleatoryNumberGenerator = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <>
      {typeof allEpisodes !== "undefined" ? (
        <Container>
          <InfoOfAnime>
            <ImageOfAnime
              src={animeInfo?.attributes?.posterImage?.original}
              alt=""
            />
            <AnimeDescription>
              <AnimeTitle>{animeInfo?.attributes?.canonicalTitle}</AnimeTitle>
              {animeInfo?.attributes?.synopsis.length < 300 ? (
                <Synopsis>{animeInfo?.attributes?.synopsis}</Synopsis>
              ) : showFullSynopsis ? (
                <Synopsis>
                  {replaceText(animeInfo?.attributes?.synopsis)}
                  <ButtonShowMore
                    onClick={() => setShowFUllSynopsis(!showFullSynopsis)}
                  >
                    Show more.
                  </ButtonShowMore>
                </Synopsis>
              ) : (
                <Synopsis>
                  {animeInfo?.attributes?.synopsis}
                  <ButtonShowMore
                    onClick={() => setShowFUllSynopsis(!showFullSynopsis)}
                  >
                    Show less.
                  </ButtonShowMore>
                </Synopsis>
              )}
            </AnimeDescription>
          </InfoOfAnime>
          <EpisodeList>
            {name !== "undefined" ? (
              <>
              {allEpisodes.map((ep) => {
                let descriptionAnime = () => {
                  return (
                    <span key={ep.attributes.number}>
                      <strong>{`S${ep.attributes.seasonNumber}EP${ep.attributes.number} - `}</strong>
                      {`${ep.attributes.canonicalTitle}`}
                    </span>
                  );
                };
                const urlToRedirect = `/anime-page/${id}/${name}/${ep.attributes.number}`;
                i++;
                return (
                  <Link
                    to={urlToRedirect}
                    key={`${name}_episode${i}_${aleatoryNumberGenerator(i, i * 100)}`}
                  >
                    <AnimeOrMangaCard
                      imgUrl={ep.attributes?.thumbnail?.original}
                      title={""}
                      description={descriptionAnime()}
                    />
                  </Link>
                );
              })}
              <ButtonSeeAllEpisodes onClick={() => redirectToAllEpisodes()}>
                See All Episodes
              </ButtonSeeAllEpisodes>
              </>

            ) : (
              <h1>Unable to find any episode :(</h1>
            )}
          </EpisodeList>
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
};
