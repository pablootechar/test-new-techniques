import React, { useEffect, useState } from "react";
import { Crown, Ghost } from "phosphor-react";
import { Link } from "react-router-dom";
import DatabaseApi from "../../shared/DatabaseApi";
import {
  AnimeOrMangaCard,
  Loading,
  MessageModal,
  StarButton,
} from "../../shared/components";
import { SHA512 } from "crypto-js";
import { styled } from "styled-components";
import { shade } from "polished";
import { ModalPhoto } from "./components/PhotoModal";

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
  position: relative;

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
  align-items: center;
  width: 100%;
  margin-top: 5px;

  & > span {
    width: 100%;
    padding-bottom: 5px;
  }

  & > input {
    background: none;
    border: none;
    outline: none;
    font-size: 18px;
    color: #f5f5f5;
    width: 100%;
  }
`;

const InfoTitleLine = styled.h5`
  font-weight: 300;
  margin-right: 10px;
  font-size: 18px;
  color: #8c8c8c;
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

  & > h3 {
    font-size: 25px;
    margin: 2vh 4.5%;
  }
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

const EditButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 25px;
  right: 10px;
  padding: 4px;
  background: #000;
  border: 2px solid ${({ theme }) => shade(0.2, theme.representativeColor)};
  border-radius: 8px;
  color: #f5f5f5;
  font-size: 20px;
`;

export function Profile() {
  const [userInfo, setUserInfo] = useState();
  const [userPhoto, setUserPhoto] = useState();
  const [favorites, setFavorites] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showReturnUpdatePhoto, setShowReturnUpdatePhoto] = useState(false);
  const [handledFavorites, setHandledFavorites] = useState(0);
  const loggedUser =
    JSON.parse(localStorage.getItem("@animatrix/profile")) || undefined;
  const updatedPhoto =
    localStorage.getItem("@animatrix/recent-update-photo") || undefined;
  let i = 0;
  let showModalUpdatedPhoto = 0;

  async function setEssentialInfo() {
    const email = SHA512(loggedUser?.email).toString();
    let infoUser = await DatabaseApi.isLogged(email);
    let imageUrl = await DatabaseApi.getImageUrl(infoUser?.photoId);
    let favoritesUser = await DatabaseApi.getFavorites(infoUser?.id);
    setUserInfo(infoUser);
    setUserPhoto(imageUrl);
    setFavorites(favoritesUser);
  }

  useEffect(() => {
    async function fetchData() {
      if (updatedPhoto && showModalUpdatedPhoto === 0) {
        setShowReturnUpdatePhoto(true);
      }

      await setEssentialInfo();
    }

    fetchData();
  }, [handledFavorites]);

  const aleatoryNumberGenerator = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <Container>
      {showModal && <ModalPhoto isOpen={showModal} setOpen={setShowModal} />}

      {typeof loggedUser !== "undefined" ? (
        <>
          {typeof userInfo !== "undefined" ? (
            <Content>
              {showReturnUpdatePhoto &&
                ((showModalUpdatedPhoto = 10),
                (
                  <MessageModal
                    typeMessage="success"
                    textMessage="Your profile photo has been changed successfully!"
                    modalState={showReturnUpdatePhoto}
                    handleStateOfModal={setShowReturnUpdatePhoto}
                  />
                ))}
              <UserInfo>
                <DivUserPhoto>
                  <img
                    src={userPhoto}
                    alt=""
                  />
                </DivUserPhoto>
                <div>
                  <Info>
                    <InfoTitleLine>Name:</InfoTitleLine>
                    <span>{userInfo.name}</span>
                  </Info>
                  <Info>
                    <InfoTitleLine>Email:</InfoTitleLine>
                    <span>{loggedUser?.email}</span>
                  </Info>
                  <Info>
                    <InfoTitleLine>Password:</InfoTitleLine>
                    <input
                      name="password-input"
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
                  {typeof userInfo !== "undefined" ? (
                    <Favorites>
                      {favorites.map((favorite) => {
                        i++;

                        return (
                          <FavoriteItem
                            key={`${
                              favorite?.anime_id
                            }_${aleatoryNumberGenerator(i, i * 100)}`}
                          >
                            <StarButton
                              listInfo={favorite}
                              databaseRequest={favorites}
                              aniId={favorite?.anime_id}
                              handleChange={handledFavorites}
                              setHandleChange={setHandledFavorites}
                              page="profile"
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
