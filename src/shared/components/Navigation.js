import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { styled } from "styled-components";

const HomeIcon = ({ iconHeight, fillColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      height={iconHeight}
      fill={fillColor}
    >
      <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
    </svg>
  );
};

const DesktopIcon = ({ iconHeight, fillColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      height={iconHeight}
      fill={fillColor}
    >
      <path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64H240l-10.7 32H160c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H346.7L336 416H512c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM512 64V288H64V64H512z" />
    </svg>
  );
};

const BookIcon = ({ iconHeight, fillColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      height={iconHeight}
      fill={fillColor}
    >
      <path d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5V78.6c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8V454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5V83.8c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11V456c0 11.4 11.7 19.3 22.4 15.5z" />
    </svg>
  );
};

const UserIcon = ({ iconHeight, fillColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      height={iconHeight}
      fill={fillColor}
    >
      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
    </svg>
  );
};

const GearIcon = ({ iconHeight, fillColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      height={iconHeight}
      fill={fillColor}
    >
      <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
    </svg>
  );
};

const Navigation = styled.div`
  position: fixed;
  bottom: -2px;
  left: 0;
  background: ${({ theme }) => theme.navigationColors.background};
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 40px;
  justify-content: space-around;
  z-index: 100;
`;

const NavigationButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  padding: 0;
`;

export const NavigationBar = () => {
  const localPathOfIcon = localStorage.getItem("@animatrix/current-page")
  const [selectedIcon, setSelectedIcon] = useState(localPathOfIcon);
  const { id, name, episodeNum } = useParams();

  const animeRoutes = [
    `/anime-page/home`,
    `/anime-page/${id}/${name}/`,
    `/anime-page/${id}/${name}/${episodeNum}`,
    `/anime-page/all-episodes/${id}/${name}`
  ];

  const mangaRoutes = [
    `/manga-page/home`,
    `/manga-page/${id}/${name}/`,
    `/manga-page/${id}/${name}/${episodeNum}`,
    `/manga-page/all-episodes/${id}/${name}`
  ];

  const profileRoutes = [
    "/profile",
    "/profile/login"
  ];

  useEffect(() => {
    const storedIcon = localStorage.getItem("@animatrix/current-page");
    if (storedIcon) {
      setSelectedIcon(storedIcon);
    } else {
      setSelectedIcon("/")
    }
  }, []);

  const verifyAlternativeRoutes = (path, arrayOfRoutes) => {
    for (let i = 0; i < arrayOfRoutes.length; i++) {
      const element = arrayOfRoutes[i];

      if (path === element) {
        return {
          baseRoute: arrayOfRoutes[0],
          currentRoute: element
        }
      }
      
    }
  }

  const isSelected = (path) => {
    let urlToCheck = path;
    const baseUrl = "%PUBLIC_URL%";
    const switchedUrl = window.location.href.replace(baseUrl, "")

    if (path === "/anime-page/home") {
      if (switchedUrl === verifyAlternativeRoutes(selectedIcon, animeRoutes)?.currentRoute) {
        urlToCheck = verifyAlternativeRoutes(selectedIcon, animeRoutes)?.baseRoute;
      }
    } else if (path === "/manga-page/home") {
      if (switchedUrl === verifyAlternativeRoutes(selectedIcon, mangaRoutes)?.currentRoute) {
        urlToCheck = verifyAlternativeRoutes(selectedIcon, mangaRoutes)?.baseRoute;
      }
    } else if (path === "/profile") {
      if (switchedUrl === verifyAlternativeRoutes(selectedIcon, profileRoutes)?.currentRoute) {
        urlToCheck = verifyAlternativeRoutes(selectedIcon, profileRoutes)?.baseRoute;
      }
    }

    if (selectedIcon === urlToCheck) {
      return { height: "2em", fill: "#fff" };
    } else {
      return { height: "1em", fill: "#8f8f8f" };
    }
  };

  const handleIconClick = (path) => {
    setSelectedIcon(path);
    localStorage.removeItem("@animatrix/current-page");
    localStorage.setItem("@animatrix/current-page", path);
    window.location.href = path;
  };

  return (
    <Navigation>
      <NavigationButton onClick={() => handleIconClick("/home")}>
          <HomeIcon
            iconHeight={isSelected("/home").height}
            fillColor={isSelected("/home").fill}
          />
      </NavigationButton>
      <NavigationButton onClick={() => handleIconClick("/anime-page/home")}>
          <DesktopIcon
            iconHeight={isSelected("/anime-page/home").height}
            fillColor={isSelected("/anime-page/home").fill}
          />
      </NavigationButton>
      <NavigationButton onClick={() => handleIconClick("/manga-page/home")}>
          <BookIcon
            iconHeight={isSelected("/manga-page/home").height}
            fillColor={isSelected("/manga-page/home").fill}
          />
      </NavigationButton>
      <NavigationButton onClick={() => handleIconClick("/profile")}>
          <UserIcon
            iconHeight={isSelected("/profile").height}
            fillColor={isSelected("/profile").fill}
          />
      </NavigationButton>
      <NavigationButton onClick={() => handleIconClick("/settings")}>
          <GearIcon
            iconHeight={isSelected("/settings").height}
            fillColor={isSelected("/settings").fill}
          />
      </NavigationButton>
    </Navigation>
  );
};
