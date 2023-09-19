import { useMemo, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { styled } from "styled-components";

const ButtonFavorite = styled.div`
  width: 34px;
  height: 24px;
  background: #2d2d2d;
  position: absolute;
  right: 5px;
  top: 5px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const StarButton = ({ listInfo, databaseRequest, aniId, type, showModal, setShowModal }) => {
  // const { listInfo, databaseRequest, aniId, type } = data;
  const [isFavorited, setIsFavorited] = useState(false);
  let loggedUser = localStorage.getItem("@animatrix/profile");
  loggedUser = JSON.parse(loggedUser) || undefined;

  const replaceTitle = (animeName) => {
    const regex = /[^a-zA-Z0-9]/g;
    const replacedText = animeName?.replace(regex, "_").toLowerCase();
    return replacedText;
  };

  useEffect(() => {
    // Verificar se o item já está nos favoritos
    const isAlreadyFavorited = databaseRequest?.some(
      (item) =>
        item.anime_id === replaceTitle(listInfo.slug || listInfo.anime_id)
    );
    setIsFavorited(isAlreadyFavorited);
  }, [databaseRequest, listInfo.anime_id, listInfo.slug]);

  const toggleFavorite = async () => {
    const id_anime_api_to_add = replaceTitle(listInfo.slug);
    const id_anime_api_to_remove = replaceTitle(listInfo.anime_id);
    const baseUrl = "https://animatrix-api.vercel.app/favorite";
    const urlRemoveFavorite = `${baseUrl}/${loggedUser?.id}/${id_anime_api_to_remove}`;

    const infoAddFavorite = {
      anime_name: listInfo.canonicalTitle,
      type: type,
      user_id: loggedUser?.id,
      photo_url: listInfo.posterImage?.original,
      synopsys: listInfo.synopsis || "Does not have a synopsis",
      anime_id: id_anime_api_to_add,
    };

    if (typeof loggedUser !== "undefined") {
      if (isFavorited) {
        // Remover dos favoritos
        await axios.delete(urlRemoveFavorite).then((response) => {});
        setIsFavorited(false);
      } else {
        // Adicionar aos favoritos
        await axios.post(baseUrl, infoAddFavorite).then((response) => {});
        setIsFavorited(true);
      }
    } else {
      setShowModal(!showModal)
    }
  };

  const starIconClass = useMemo(() => {
    return isFavorited ? "fa-solid fa-star" : "fa-regular fa-star";
  }, [isFavorited]);

  return (
    <ButtonFavorite key={aniId} onClick={() => toggleFavorite()}>
      <i className={starIconClass} style={{ color: "#ffd500" }} />
    </ButtonFavorite>
  );
};
