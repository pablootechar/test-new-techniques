import { useCallback, useEffect, useMemo, useState } from "react";
import Api from "../../shared/Api";
import { SHA512 } from "crypto-js";
import DatabaseApi from "../../shared/DatabaseApi";
import { Loading, MessageModal, Slider } from "../../shared/components";
import { styled } from "styled-components";

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
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.9),
    rgba(0, 0, 0, 0.9),
    rgba(0, 0, 0, 0.8),
    transparent
  );
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

const AnimeList = styled.div``;

export const MangaHome = () => {
  const [rows, setRows] = useState([]);
  const [featured, setFeatured] = useState();
  const [favorites, setFavorites] = useState();
  const [showModal, setShowModal] = useState();
  const [showAlternativeLoading, setShowAlternativeLoading] = useState(false);
  let loggedUser = localStorage.getItem("@animatrix/profile");
  loggedUser = JSON.parse(loggedUser) || undefined;
  const memoFeatured = useMemo(() => featured, [featured]);

  const fetchData = useCallback(async () => {
    const email = SHA512(loggedUser?.email).toString();
    const trending = await Api.getTrending();
    let infoUser = await DatabaseApi.isLogged(email);
    let favoritesUser = await DatabaseApi.getFavorites(infoUser?.id);

    const featuredItem = trending[Math.floor(Math.random() * trending.length)];
    const rows = [
        { title: "Upcoming", mangas: await Api.getUpcoming() },
        { title: "Shonen", mangas: await Api.getMangaByCategory("shounen") },
        { title: "Isekai", mangas: await Api.getMangaByCategory("isekai") },
        { title: "Seinen", mangas: await Api.getMangaByCategory("seinen") },
        { title: "Mecha", mangas: await Api.getMangaByCategory("mecha") },
        { title: "Shoujo", mangas: await Api.getMangaByCategory("shoujo") },
        { title: "Josei", mangas: await Api.getMangaByCategory("josei") },
        { title: "Slice of Life", mangas: await Api.getMangaByCategory("slice-of-life") },
    ];

    localStorage.setItem(
      "@animatrix/home-anime",
      JSON.stringify({
        rows: rows,
        featured: featured,
      })
    );

    setRows(rows);
    setFeatured(featuredItem);
    setFavorites(favoritesUser);
  }, []);

  useEffect(() => {
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
  });

  function replaceText(synopsis, typeText) {
    if (typeText === "title") {
      const replacedText = synopsis?.substring(0, 20);
      return replacedText.length >= 20 ? replacedText + "..." : replacedText;
    } else if (typeText === "synopsis") {
      return synopsis?.substring(0, 110) + "...";
    }
  }

  return (
      typeof favorites !== "undefined" ? (
        <Container>
          {showModal && (
            <MessageModal 
              typeMessage="error"
              textMessage="You need to login to add an anime to favorites!"
              modalState={showModal}
              handleStateOfModal={setShowModal}
            />
          )}
          <Featured>
            <BackgroundImage
              src={memoFeatured?.attributes?.posterImage.original}
              alt={memoFeatured?.attributes?.canonicalTitle}
            />
            <FeaturedDescription>
              <Title>
                {replaceText(memoFeatured?.attributes?.canonicalTitle, "title")}
              </Title>
              <Synopsis>
                {replaceText(memoFeatured?.attributes?.synopsis, "synopsis")}
              </Synopsis>
            </FeaturedDescription>
            <Vignette />
          </Featured>

          <AnimeList>
            <ul>
              {rows.map((row, key) => (
                <li key={key}>
                  <Slider
                    title={row.title}
                    animes={row.mangas}
                    redirectTo="manga"
                    databaseRequest={favorites}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setShowAlternativeLoading={setShowAlternativeLoading}
                  />
                </li>
              ))}
            </ul>
          </AnimeList>
        </Container>
      ) : (
        <Loading />
      )
  );
};
