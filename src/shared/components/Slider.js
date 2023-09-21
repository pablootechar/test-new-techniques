import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { styled } from "styled-components";
import { StarButton } from "./StarButton";
import { useNavigate } from "react-router-dom";
import Api from "../Api";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 3000, min: 2310 },
    items: 6,
  },
  smallDesktop: {
    breakpoint: { max: 2310, min: 1824 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1824, min: 1500 },
    items: 5,
  },
  smallTablet: {
    breakpoint: { max: 1500, min: 1050 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 1050, min: 446 },
    items: 3,
  },
  smallMobile: {
    breakpoint: { max: 445, min: 0 },
    items: 2,
  },
};

const CarouselItem = styled.div`
  width: 24vw;
  height: 33vw;
  overflow: hidden;
  border: 3px solid ${({ theme }) => theme.representativeColor};
  margin-right: 20px;
  border-radius: 5px;
`;

const ItemInfo = styled.div`
  width: inherit;
  height: inherit;
  overflow: hidden;
`;

const IncorporateAnImage = styled.div`
  width: inherit;
  height: inherit;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  object-fit: cover;
  box-sizing: border-box;
  cursor: pointer;
`;

const CarouselTitle = styled.h1`
  margin: 10px 5px;
`;

const replaceTitle = (animeName) => {
  const regex = /[^a-zA-Z0-9]/g;
  const replacedText = animeName?.replace(regex, "_").toLowerCase();
  return replacedText;
};

export const Slider = React.memo(
  ({ title, animes = undefined, redirectTo = "", databaseRequest, showModal, setShowModal }) => {
    const navigate = useNavigate();
    const redirectPage = async (allData, animeId, animeName, animeShowType) => {
      let name = animeName;
      if (animeShowType === "TV") {
        name = `${name} (TV)`;
      }

      await Api.getIdInGogoAnimeApi(name, 0)
        .then((response) => {
          const theRealAnimeSlug = response?.results[0]?.id;
  
          async function test() {
            if (allData.type === "manga") {
              return navigate(`/manga-page/${animeId}/${allData?.attributes?.slug}/`);
            }

            if (typeof theRealAnimeSlug === "undefined") {
              await Api.getIdInGogoAnimeApi(animeName, 0).then((response) => {
                let redirectUrl = response.results[0]?.id;
                redirectUrl = redirectUrl?.replace("-dub", "");
                localStorage.setItem(
                  "@animatrix/current-page",
                  `/anime-page/${animeId}/${redirectUrl}/`
                );
                navigate(`/anime-page/${animeId}/${redirectUrl}/`);
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
      <div>
        {typeof animes !== "undefined" && (
          <div>
            <CarouselTitle>{title}</CarouselTitle>
            <Carousel
              responsive={responsive}
              infinite={true}
              containerClass="carrossel-container"
              removeArrowOnDeviceType={["mobile", "smallMobile"]}
              centerMode={true}
              className="Slider"
            >
              {animes.map((infoCard) => {
                return (
                  <CarouselItem key={infoCard.attributes}>
                    <StarButton
                      listInfo={infoCard.attributes}
                      databaseRequest={databaseRequest}
                      aniId={replaceTitle(infoCard?.attributes?.slug)}
                      type={redirectTo}
                      showModal={showModal}
                      setShowModal={setShowModal}
                    />
                    <ItemInfo
                      onClick={() => {
                        redirectPage(infoCard, infoCard.id, infoCard.attributes?.titles?.en_jp, infoCard.attributes?.showType);
                      }}
                    >
                      <IncorporateAnImage>
                        <ItemImage
                          src={infoCard.attributes?.posterImage.small}
                          alt={infoCard.attributes?.canonicalTitle}
                          draggable="false"
                          loading="lazy"
                        />
                      </IncorporateAnImage>
                    </ItemInfo>
                  </CarouselItem>
                );
              })}
            </Carousel>
          </div>
        )}
      </div>
    );
  }
);
