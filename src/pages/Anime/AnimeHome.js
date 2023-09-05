import { useEffect, useState } from "react";
import Api from "../../shared/Api";
import { SHA512 } from "crypto-js";
import DatabaseApi from "../../shared/DatabaseApi";
import { Loading, Slider } from "../../shared/components";
import { styled } from "styled-components";

export const AnimeHome = () => {
  const [rows, setRows] = useState([]);
  const [featured, setFeatured] = useState();
  const [favorites, setFavorites] = useState();
  const loggedUser = JSON.parse(localStorage.getItem("@animatrix/profile")) || undefined;

  useEffect(() => {
    async function fetchData() {
      const email = SHA512(loggedUser?.email).toString();
      const trending = await Api.getTrending();
      let infoUser = await DatabaseApi.isLogged(email);
      let favoritesUser = await DatabaseApi.getFavorites(infoUser?.id);

      const featured = trending[Math.floor(Math.random() * trending.length)];
      const rows = [
        { title: "Trending", animes: trending },
        { title: "Upcoming", animes: await Api.getUpcoming() },
        { title: "Shonen", animes: await Api.getByCategory("shounen") },
        { title: "Isekai", animes: await Api.getByCategory("isekai") },
        { title: "Seinen", animes: await Api.getByCategory("seinen") },
        { title: "Mecha", animes: await Api.getByCategory("mecha") },
        { title: "Shoujo", animes: await Api.getByCategory("shoujo") },
        { title: "Josei", animes: await Api.getByCategory("josei") },
        {
          title: "Slice of Life",
          animes: await Api.getByCategory("slice-of-life"),
        },
      ];

      localStorage.setItem(
        "@animatrix/home-anime",
        JSON.stringify({
          rows: rows,
          featured: featured,
        })
      );

      setRows(rows);
      setFeatured(featured);
      setFavorites(favoritesUser);
    }

    function loadLocal() {
      const data = JSON.parse(localStorage.getItem("@animatrix/home-anime"));
      if (data) {
        setRows(data.rows);
        setFeatured(data.featured);
        return true;
      }
      return false;
    }

    if (!loadLocal() && !rows.length && !featured) {
      fetchData();
    }

    return () => {
      localStorage.removeItem("@animatrix/home-anime");
    };
  }, []);

  function replaceText(synopsis, typeText) {
    if (typeText === "title") {
      const replacedText = synopsis?.substring(0, 20);
      return replacedText.length >= 20 ? replacedText + "..." : replacedText;
    } else if (typeText === "synopsis") {
      return synopsis?.substring(0, 110) + "...";
    }
  }

  const Container = styled.div`
    display: flex;
    max-width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    flex-direction: column;
    padding-bottom: 50px;
  `;

  const Featured = styled.div`
    position: relative;
    width: 100% !important;
    height: 60.25vw !important;
    overflow: hidden;
  `;

  const BackgroundImage = styled.img`
    position: absolute;
    background-position: center;
    background-size: cover;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
    opacity: 1;
  `;

  const FeaturedDescription = styled.div`
    background: linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.8), transparent);
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;
    padding-right: 20%;
    height: 100%;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    color: #c9c9c9;
  `;

  const Title = styled.h1`
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 20px;
    letter-spacing: 2px;
    color: #f5f5f5;
  `;

  const Synopsis = styled.p`
    font-size: 18px;
    font-weight: 400;
  `;

  const Vignette = styled.div`
    width: 100%;
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 20%;
    background: linear-gradient(to top, #000, transparent);
  `;

  return (
    <>
      {typeof featured !== "undefined" ? (
        <Container>
          <Featured>
            <BackgroundImage
              src={featured?.attributes?.posterImage.original}
              alt={featured?.attributes?.canonicalTitle}
            />
            <FeaturedDescription>
              <Title>
                {replaceText(featured?.attributes?.canonicalTitle, "title")}
              </Title>
              <Synopsis>{replaceText(featured?.attributes?.synopsis, "synopsis")}</Synopsis>
            </FeaturedDescription>
            <Vignette />
          </Featured>

          <div>
            <ul>
              {rows.map((row, key) => (
                <li key={key}>
                  <Slider
                    title={row.title}
                    animes={row.animes}
                    redirectTo="anime"
                    databaseRequest={favorites}
                  />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
};
