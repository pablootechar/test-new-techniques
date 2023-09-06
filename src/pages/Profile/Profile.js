import React, { useEffect, useState } from "react";
import { ArrowArcLeft, NotePencil, Crown, Ghost } from "phosphor-react";
import { Link } from "react-router-dom";
import DatabaseApi from "../../shared/DatabaseApi";
import { AnimeOrMangaCard, Loading, StarButton } from "../../shared/components";
import { SHA512 } from "crypto-js";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-bottom: 50px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  top: 5vh;
  left: 0;
  width: 100%;
  position: relative;
`;

const DivUserPhoto = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  justify-content: center;
  align-items: center;

  & > img {
    height: 210px;
    width: 210px;
    border: 3px solid ${({ theme }) => theme.representativeColor};
    padding: 2px;
    margin-bottom: 20px;
    border-radius: 50%;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const PremiumPlan = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 80%;
  margin-top: 20px;
  padding: 5px;
  border: 1px solid #2d2d2d;
  background: url(https://gifs.eco.br/wp-content/uploads/2022/06/gifs-de-estrelas-caindo-11.gif);
`;

const PremiumText = styled.span`
  color: #fff700;
  font-weight: 500;
  font-size: 18px;
`;

const FreePlan = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 80%;
  margin-top: 20px;
  padding: 5px;
  border: 1px solid #2d2d2d;
  background: url(https://i.gifer.com/SFFd.gif);
`;

const FreeText = styled.span`
  color: #e0e0e0;
  font-weight: 500;
  font-size: 18px;
`;

const FavoritesDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-top: 5vh;
`;

const Favorites = styled.div`
  height: 90vh;
  overflow-y: auto;
  height: 35vh;
  width: 95%;
  margin: 0vh 2.5%;
  overflow-x: hidden;
`;

const FavoriteItem = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
`;

export function Profile() {
  const [userInfo, setUserInfo] = useState();
  const [userPhoto, setUserPhoto] = useState();
  const [favorites, setFavorites] = useState();
  const loggedUser =
    JSON.parse(localStorage.getItem("@animatrix/profile")) || undefined;

  useEffect(() => {
    async function setEssentialInfo() {
      const email = SHA512(loggedUser?.email).toString();
      let infoUser = await DatabaseApi.isLogged(email);
      let imageUrl = await DatabaseApi.getImageUrl(infoUser?.photoId);
      let favoritesUser = await DatabaseApi.getFavorites(infoUser?.id);
      setUserInfo(infoUser);
      setUserPhoto(imageUrl);
      setFavorites(favoritesUser);
    }

    setEssentialInfo();
  }, [favorites]);

  return (
    <Container>
      {typeof loggedUser !== "undefined" ? (
        <>
          {typeof userInfo !== "undefined" ? (
            <Content>
              <UserInfo>
                <ArrowArcLeft
                  style={{ position: "absolute", top: "0px", left: "30px" }}
                  size={32}
                  color="#fff"
                />
                <Link to="edit">
                  <NotePencil
                    style={{ position: "absolute", top: "0px", right: "30px" }}
                    size={32}
                    color="#fff"
                  />
                </Link>
                <DivUserPhoto>
                  <img src={userPhoto} alt="" />
                </DivUserPhoto>
                <div>
                  <Info>
                    <span>Name:</span>
                    <span>{userInfo.name}</span>
                  </Info>
                  <Info>
                    <span>E-mail:</span>
                    <span>{loggedUser?.email}</span>
                  </Info>
                  <Info>
                    <span>Password:</span>
                    <input
                      value={loggedUser?.password}
                      type="password"
                      disabled
                    ></input>
                  </Info>
                </div>
                {userInfo?.isPremium === 1 ? (
                  <PremiumPlan>
                    <PremiumText>Premium Plan</PremiumText>
                    <Crown
                      style={{ marginLeft: "20px" }}
                      size={28}
                      color="#fff700"
                    />
                  </PremiumPlan>
                ) : (
                  <FreePlan>
                    <FreeText>Plano Gratuito</FreeText>
                    <Ghost
                      size={32}
                      style={{ marginLeft: "20px" }}
                      color="#e0e0e0"
                    />
                  </FreePlan>
                )}
              </UserInfo>
              <FavoritesDiv>
                <h3>Favorites</h3>
                <Favorites>
                  <br />
                  {typeof userInfo !== "undefined" ? (
                    <Favorites>
                      {favorites.map((favorite) => {
                        return (
                          <FavoriteItem>
                            <StarButton
                              listInfo={favorite}
                              databaseRequest={favorites}
                              aniId={favorite?.anime_id}
                            />
                            <AnimeOrMangaCard
                              imgUrl={favorite?.photo}
                              title={favorite.name}
                            />
                          </FavoriteItem>
                        );
                      })}
                    </Favorites>
                  ) : (
                    // <img src={notWatched} alt="" />
                    <div>c ainda n viu nada bro</div>
                  )}
                </Favorites>
              </FavoritesDiv>
            </Content>
          ) : (
            <Loading />
          )}
        </>
      ) : (
        <div>
          <h1>Você não está logado</h1>
          <img
            src="https://www.meuzapzap.com/imagens/thumb/meuzapzap141607160616image.jpeg"
            height="500px"
            alt="cachorro bigodudokkkkj"
          />
          <h2>
            <Link to="/profile/login">Faça login</Link> ou sofra as{" "}
            <span style={{ color: "#ff0000", cursor: "pointer" }}>
              consequências
            </span>
          </h2>
        </div>
      )}
    </Container>
  );
}
