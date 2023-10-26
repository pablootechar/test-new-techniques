import { SHA512 } from "crypto-js";
import { Check } from "phosphor-react";
import { shade } from "polished";
import { styled } from "styled-components";
import DatabaseApi from "../../../shared/DatabaseApi";
import { InUseImage } from "./InUseImage";
import { useEffect } from "react";

const ListOfBenefits = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  list-style: none;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  background: #000;
`;

const InfoPlanDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Premium = styled.h1`
  font-size: 20px;
  color: ${({ theme }) => theme.representativeColor};
  margin-right: 8px;
`;

const Plan = styled.h1`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.textColor};
`;

const DivPlanTitle = styled.div`
  display: flex;
`;

const ListIcon = styled.svg`
  width: 50px;
  fill: ${({ theme }) => theme.representativeColor};
`;

const InfoPlan = () => {
  return (
    <InfoPlanDiv>
      <ListIcon
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 72 72"
        width="50px"
      >
        <path d="M 36 8.9980469 C 35.2325 8.9980469 34.464906 9.2929062 33.878906 9.8789062 L 30.146484 13.611328 L 24.363281 11.876953 C 23.498281 11.616953 22.562406 11.760578 21.816406 12.267578 C 21.069406 12.774578 20.589719 13.591234 20.511719 14.490234 L 20.25 17.5 L 15 17.5 C 13.96 17.5 12.996219 18.039828 12.449219 18.923828 C 11.902219 19.807828 11.853359 20.911797 12.318359 21.841797 L 14.177734 25.5625 L 12.269531 29.759766 C 11.819531 30.748766 11.939984 31.902344 12.583984 32.777344 C 13.227984 33.651344 14.299047 34.110563 15.373047 33.976562 L 16 33.898438 L 16 38 L 16 38.25 C 16 38.25 14.261719 40.629844 14.261719 42.964844 C 14.261719 46.089844 16.802375 48.979141 18.609375 49.869141 C 20.670375 58.464141 30.565 64 36 64 C 41.435 64 51.329625 58.464141 53.390625 49.869141 C 55.197625 48.978141 57.738281 46.472656 57.738281 43.347656 C 57.738281 41.013656 56 38.25 56 38.25 L 56 38 L 56 33.898438 L 56.628906 33.976562 C 56.753906 33.991563 56.877 34 57 34 C 57.947 34 58.846969 33.551344 59.417969 32.777344 C 60.060969 31.902344 60.181422 30.748766 59.732422 29.759766 L 57.824219 25.5625 L 59.683594 21.841797 C 60.148594 20.911797 60.099734 19.807828 59.552734 18.923828 C 59.005734 18.039828 58.04 17.5 57 17.5 L 51.75 17.5 L 51.488281 14.490234 C 51.410281 13.590234 50.930594 12.774578 50.183594 12.267578 C 49.437594 11.761578 48.502719 11.617953 47.636719 11.876953 L 41.853516 13.611328 L 38.121094 9.8789062 C 37.535094 9.2929063 36.7675 8.9980469 36 8.9980469 z M 36 16.242188 L 38.878906 19.121094 C 39.658906 19.902094 40.803328 20.189047 41.861328 19.873047 L 45.830078 18.683594 L 46.011719 20.759766 C 46.145719 22.309766 47.444 23.5 49 23.5 L 52.146484 23.5 L 51.816406 24.158203 C 51.412406 24.968203 51.395531 25.916234 51.769531 26.740234 L 52.048828 27.357422 L 49.371094 27.023438 C 49.248094 27.008437 49.124 27 49 27 L 23 27 C 22.876 27 22.751906 27.008437 22.628906 27.023438 L 19.951172 27.357422 L 20.230469 26.740234 C 20.604469 25.916234 20.587594 24.968203 20.183594 24.158203 L 19.853516 23.5 L 23 23.5 C 24.556 23.5 25.854281 22.309766 25.988281 20.759766 L 26.169922 18.683594 L 30.138672 19.873047 C 31.194672 20.190047 32.341094 19.902094 33.121094 19.121094 L 36 16.242188 z M 23.1875 33 L 29 33 L 29 35 L 22 35 L 22 33.148438 L 23.1875 33 z M 33 33 L 39 33 L 39 35 L 33 35 L 33 33 z M 43 33 L 48.8125 33 L 50 33.148438 L 50 35 L 43 35 L 43 33 z M 22.347656 41 L 49.751953 41 C 49.983373 41.178157 50.720703 41.83909 50.720703 43.142578 C 50.720703 44.492578 48 45.042969 48 45.042969 C 47.761854 46.673308 47.246234 48.117421 46.5625 49.396484 C 46.122919 49.03036 45.655614 48.661231 45.121094 48.279297 C 44.446094 47.799297 43.511297 47.954906 43.029297 48.628906 C 42.548297 49.303906 42.704906 50.239703 43.378906 50.720703 C 43.944139 51.124385 44.419728 51.504811 44.855469 51.880859 C 44.264201 52.573645 43.631324 53.191775 42.974609 53.738281 C 42.596341 53.204953 42.172906 52.646821 41.638672 52.023438 C 41.100672 51.394437 40.154438 51.318375 39.523438 51.859375 C 38.894438 52.398375 38.822328 53.345609 39.361328 53.974609 C 39.824686 54.515317 40.193005 54.996115 40.513672 55.447266 C 38.65648 56.497379 36.936122 57 36 57 C 35.076061 57 33.327775 56.518033 31.445312 55.505859 C 31.773102 55.039596 32.155645 54.540222 32.638672 53.976562 C 33.177672 53.347562 33.105562 52.400328 32.476562 51.861328 C 31.845562 51.321328 30.900328 51.394438 30.361328 52.023438 C 29.789217 52.690666 29.341116 53.284292 28.947266 53.849609 C 28.268496 53.306352 27.617929 52.687131 27.015625 51.992188 C 27.481765 51.580735 28.000481 51.163937 28.621094 50.720703 C 29.295094 50.238703 29.451703 49.302906 28.970703 48.628906 C 28.487703 47.954906 27.553906 47.799297 26.878906 48.279297 C 26.291892 48.69874 25.785922 49.102567 25.3125 49.503906 C 24.635908 48.200679 24.154905 46.723108 24 45.042969 C 24 45.042969 21.269531 44.467375 21.269531 42.859375 C 21.269531 41.530375 22.347656 41 22.347656 41 z" />
      </ListIcon>
      <DivPlanTitle>
        <Premium>Premium</Premium>
        <Plan>Plan</Plan>
      </DivPlanTitle>
    </InfoPlanDiv>
  );
};

const ShopItem = styled.div`
  position: relative;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 50px;
  box-shadow: 0px 0px 25px ${({ theme }) => theme.representativeColor};

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
    background: linear-gradient(
      45deg,
      ${({ theme }) => shade(0.5, theme.colors.themeTextColor)},
      ${({ theme }) => theme.representativeColor},
      ${({ theme }) => shade(0.5, theme.colors.themeTextColor)},
      ${({ theme }) => theme.representativeColor},
      ${({ theme }) => shade(0.5, theme.colors.themeTextColor)},
      ${({ theme }) => theme.representativeColor},
      ${({ theme }) => shade(0.5, theme.colors.themeTextColor)},
      ${({ theme }) => theme.representativeColor}
    );
    z-index: -1;
    background-size: 300%;
    border-radius: 10px;
    animation: rgb-border 8s linear infinite,
      box-shadow-animation 3s linear infinite;
  }

  @keyframes rgb-border {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 300%;
    }
  }

  @keyframes box-shadow-animation {
    0% {
      box-shadow: 0px 0px 25px ${({ theme }) => theme.representativeColor};
    }
    50% {
      box-shadow: 0px 0px 38px
        ${({ theme }) => shade(0.5, theme.colors.themeTextColor)};
    }
    100% {
      box-shadow: 0px 0px 25px ${({ theme }) => theme.representativeColor};
    }
  }
`;

const ListItems = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Item = styled.div`
  width: 65%;
  margin: 5px auto;
  padding: 6px 0;
  display: flex;
  align-items: center;
`;

const ListButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  position: relative;
  flex-direction: column;
  height: 100px;
`;

const ListButton = styled.button`
  width: 80px;
  height: 40px;
  bottom: 0;
  color: #fff;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.representativeColor};
  border-radius: 20vw;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    border: 2px solid rgba(255, 255, 255, 0.479);
    background-color: ${({ theme }) => theme.representativeColor};
  }

  &:disabled {
    color: #c9c9c9;
    font-style: italic;
    border: 2px solid ${({ theme }) => shade(0.6, theme.representativeColor)};
    background: ${({ theme }) => shade(0.6, theme.representativeColor)};
    pointer-events: none;
  }
`;

const ItemPrice = styled.span`
  color: rgba(247, 244, 244, 0.37);
  text-align: center;
  width: 100%;
  margin-bottom: 8px;
`;

export const ShopItemPremium = ({ showModal, setShowModal, inUseImage = undefined }) => {
  useEffect(() => {
    if (inUseImage !== undefined) {
      document.getElementById("list-premium-button").disabled = true;
    }
  }, []);

  return (
    <ShopItem>
      {typeof inUseImage !== "undefined" && (
        <InUseImage src={inUseImage} alt="" />
      )}
      <ListOfBenefits>
        <InfoPlan />
        <ListItems>
          <Item>
            <Check size={20} color="#2d2" weight="bold" />
            <p>Watch Animes</p>
          </Item>
          <Item>
            <Check size={20} color="#2d2" weight="bold" />
            <p>Read Manga</p>
          </Item>
          <Item>
            <Check size={20} color="#2d2" weight="bold" />
            <p>Animes</p>
          </Item>
          <Item>
            <Check size={20} color="#2d2" weight="bold" />
            <p>Ad Free</p>
          </Item>
        </ListItems>
        <ListButtonGroup>
          <ItemPrice>
            <i>Subscribe for $5/month</i>
          </ItemPrice>
          <ListButton
            id="list-premium-button"
            onClick={async () => {
              let userId =
                localStorage.getItem("@animatrix/profile") !== null
                  ? JSON.parse(localStorage.getItem("@animatrix/profile"))
                  : "deslogado bro";

              if (userId === "deslogado bro") {
                // alert("crie ou logue em uma conta primeiro");
                setShowModal(!showModal);
                return;
              }
              const email = SHA512(userId?.email).toString();
              const { id, name } = await DatabaseApi.isLogged(email);
              const url = `https://api.whatsapp.com/send?phone=5514996745539&text=Hi,%20all%20right?%20I'm%20${name} (${id})%20and%20would%20like%20to%20subscribe%20to%20the%20site's%20premium%20plan.%20How%20do%20I%20do%20it?`;

              window.open(url, "_blank");
            }}
          >
            Buy
          </ListButton>
        </ListButtonGroup>
      </ListOfBenefits>
    </ShopItem>
  );
};
