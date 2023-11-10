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

export const MangaInfo = () => {
  const [allChapters, setAllChapters] = useState();
  const [mangaInfo, setMangaInfo] = useState();
  const { id, name } = useParams();
  const [showFullSynopsis, setShowFUllSynopsis] = useState(true);
  let i = 0;

  const chapter = [
    {
      id: 1,
      chapterNumber: 1,
    },
    {
      id: 2,
      chapterNumber: 2,
    },
    {
      id: 3,
      chapterNumber: 3,
    },
  ];

  useEffect(() => {
    setAllChapters(chapter);

    async function request() {
      const info = await Api.getInfoOfMangaByKitsu(id);
      setMangaInfo(info.data);
    }

    request();
  }, []);

  function replaceText(synopsis) {
    const replacedText = synopsis?.substring(0, 300);
    return replacedText?.length >= 300 ? replacedText + "..." : replacedText;
  }

  const aleatoryNumberGenerator = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <>
      {typeof allChapters !== "undefined" ? (
        <Container>
          <InfoOfAnime>
            <ImageOfAnime
              src={mangaInfo?.attributes?.posterImage?.original}
              alt=""
            />
            <AnimeDescription>
              <AnimeTitle>{mangaInfo?.attributes?.canonicalTitle}</AnimeTitle>
              {mangaInfo?.attributes?.synopsis.length < 300 ? (
                <Synopsis>{mangaInfo?.attributes?.synopsis}</Synopsis>
              ) : showFullSynopsis ? (
                <Synopsis>
                  {replaceText(mangaInfo?.attributes?.synopsis)}
                  <ButtonShowMore
                    onClick={() => setShowFUllSynopsis(!showFullSynopsis)}
                  >
                    Show more.
                  </ButtonShowMore>
                </Synopsis>
              ) : (
                <Synopsis>
                  {mangaInfo?.attributes?.synopsis}
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
            {allChapters.map((ep) => {
              let descriptionAnime = () => {
                return (
                  <span key={ep.id}>
                    <strong>{`Chapter - ${ep.chapterNumber}`}</strong>
                  </span>
                );
              };
              const urlToRedirect = `/manga-page/${id}/${name}/${ep.chapterNumber}`;
              i++;
              return (
                <Link
                  to={urlToRedirect}
                  key={`${name}_cap${i}_${aleatoryNumberGenerator(i, i * 100)}`}
                >
                  <AnimeOrMangaCard
                    imgUrl={""}
                    title={""}
                    description={descriptionAnime()}
                  />
                </Link>
              );
            })}
            {/* <ButtonSeeAllEpisodes onClick={() => redirectToAllEpisodes()}>
              See All Episodes
            </ButtonSeeAllEpisodes> */}
          </EpisodeList>
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
};
