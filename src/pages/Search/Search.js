import React, { useState, useEffect, memo } from "react";
import Api from "../../shared/Api";
import { Loading } from "../../shared/components";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const useFetch = (query) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      setLoading(true);
      Api.search(query, 20)
        .then((response) => {
          setData(response);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [query]);

  return { data, loading, error };
};

const SearchCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageCard = styled.img`
  height: 105px;
  border: 2px solid ${({ theme }) => theme.representativeColor};
  padding: 2px;
  border-radius: 5px;
`;

const ResultItem = memo(({ infoCard, redirectPage }) => {
  return (
    <SearchCard key={infoCard.attributes.id}>
      <div
        className="animeHome__slidesPadrao__box"
        onClick={() =>
          redirectPage(
            infoCard?.id,
            infoCard.attributes.canonicalTitle,
            infoCard.attributes.showType
          )
        }
      >
        <div className="animeHome__slidesPadrao__slide-img">
          <ImageCard
            src={infoCard.attributes?.posterImage.small}
            alt={infoCard.attributes?.canonicalTitle}
            draggable="false"
          />
        </div>
      </div>
    </SearchCard>
  );
});

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 50px;
  padding-top: 20px;
`;

const Grid = styled.div`
  display: grid;
  width: 95%;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  justify-content: center;
  align-items: center;
`;

export const SearchPage = () => {
  const patternTextSearch = localStorage.getItem("@animatrix/text_search");
  const navigate = useNavigate();
  const { data: dataToBeRendering, loading } = useFetch(patternTextSearch);

  const redirectPage = async (animeId, animeName, animeShowType) => {
    let name = animeName;
    if (animeShowType === "TV") {
      name = `${name} (TV)`;
    }
    name = name.replace("/", " ");

    await Api.getIdInGogoAnimeApi(name, 0)
      .then((response) => {
        const theRealAnimeSlug = response?.results[0]?.id;

        async function test() {
          if (typeof theRealAnimeSlug === "undefined") {
            await Api.getIdInGogoAnimeApi(animeName, 0).then((response) => {
              localStorage.setItem(
                "@animatrix/current-page",
                `/anime-page/${animeId}/${response.results[0]?.id}/`
              );
              navigate(`/anime-page/${animeId}/${response.results[0]?.id}/`);
            })
          } else {
            localStorage.setItem(
              "@animatrix/current-page",
              `/anime-page/${animeId}/${theRealAnimeSlug}/`
            );
            navigate(`/anime-page/${animeId}/${theRealAnimeSlug}/`);
          }
        }
        test();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Grid>
        {loading ? (
          <Loading />
        ) : Array.isArray(dataToBeRendering) ? (
          dataToBeRendering.map((infoCard) => (
            <ResultItem
              key={infoCard.id}
              infoCard={infoCard}
              redirectPage={redirectPage}
            />
          ))
        ) : null}
      </Grid>
    </Container>
  );
};
