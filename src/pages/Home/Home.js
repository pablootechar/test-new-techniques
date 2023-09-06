// import of images

import kikyou from "./assets/kikiyou.webp";
import kyoraku from "./assets/Kyoraku.webp";
import meliodas from "./assets/meliodas.webp";
import naraku from "./assets/naraku.webp";
import gojo from "./assets/satoru.webp";
import seshomaru from "./assets/seshomaru.webp";
import firstSungJinWoo from "./assets/sung_jin_woo.webp";
import secondSungJinWoo from "./assets/sung_jin_woo2.webp";

// -------------------------------------------------------- //

import React from "react";
import { styled } from "styled-components";
import {
  MainHome,
  ShopItemFree,
  ScrollButton,
  ShopItemPremium,
} from "./components";

const DivHomeTitle = styled.div`
  position: absolute;
  display: flex;
  top: 30px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const HomeCenterImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 90vh;
  -webkit-mask-image: linear-gradient(-180deg, #000 50%, transparent 100%);
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const Ani = styled.h1`
  font-size: 55px;
  color: ${({ theme }) => theme.colors.textColor};
`;

const Matrix = styled.h1`
  font-size: 55px;
  color: ${({ theme }) => theme.colors.themeTextColor};
`;

const HomeTitle = () => {
  return (
    <DivHomeTitle>
      <Ani>Ani</Ani>
      <Matrix>matrix</Matrix>
    </DivHomeTitle>
  );
};

const HomeDescription = styled.h2`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  width: 100%;
  bottom: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  grid-column: 1/7;
  font-size: 40px;
  place-self: start;
  color: ${({ theme }) => theme.representativeColor};
  text-shadow: 2px 2px 1px #000, 2px 2px 1px #fff;
  z-index: 1;
`;

const ShopHome = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
`;

const images = [
  firstSungJinWoo,
  gojo,
  kikyou,
  kyoraku,
  meliodas,
  naraku,
  secondSungJinWoo,
  seshomaru,
];

const alNum = Math.floor(Math.random() * images.length);

export const Home = () => {
  return (
    <Container>
      <MainHome>
        <HomeTitle />
        <HomeDescription>Welcome, Otaku!</HomeDescription>
        <ScrollButton />
        <HomeCenterImage src={images[alNum]} alt="aleatory anime" />
      </MainHome>
      <ShopHome>
        <ShopItemFree />
        <ShopItemPremium />
      </ShopHome>
    </Container>
  );
};
