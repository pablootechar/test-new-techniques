import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/global";
import { NavigationBar, Search } from "./shared/components";
import { useState } from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import {
  darkCrimson,
  darkCyan,
  darkGreen,
  darkNavyBlue,
  darkOrange,
  darkPink,
  darkPurple,
  darkRed,
  darkSkyBlue,
  darkYellow,
} from "./styles";
import {
  AnimeHome,
  AnimeInfo,
  Home,
  MangaHome,
  Profile,
  SearchPage,
  Settings,
  ViewAllEpisodes,
  WatchEpisode,
} from "./pages";
import Login from "./pages/Profile/Login";

function App() {
  const [currentTheme, setCurrentTheme] = useState(darkCyan);
  const localStorageTheme = localStorage.getItem("@animatrix/theme");

  useState(() => {
    if (localStorageTheme) {
      if (localStorageTheme === "darkCyan") {
        setCurrentTheme(darkCyan);
      } else if (localStorageTheme === "darkPurple") {
        setCurrentTheme(darkPurple);
      } else if (localStorageTheme === "darkPink") {
        setCurrentTheme(darkPink);
      } else if (localStorageTheme === "darkOrange") {
        setCurrentTheme(darkOrange);
      } else if (localStorageTheme === "darkSkyBlue") {
        setCurrentTheme(darkSkyBlue);
      } else if (localStorageTheme === "darkNavyBlue") {
        setCurrentTheme(darkNavyBlue);
      } else if (localStorageTheme === "darkYellow") {
        setCurrentTheme(darkYellow);
      } else if (localStorageTheme === "darkGreen") {
        setCurrentTheme(darkGreen);
      } else if (localStorageTheme === "darkRed") {
        setCurrentTheme(darkRed);
      } else if (localStorageTheme === "darkCrimson") {
        setCurrentTheme(darkCrimson);
      } else {
        setCurrentTheme(darkCyan);
      }
    }
  }, []);

  // Função de prefetch para AnimeHome
  const prefetchAnimeHome = () => {
    import("./pages/Anime/AnimeHome"); // Substitua pelo caminho correto do arquivo da página
  };

  // Função de prefetch para MangaHome
  const prefetchMangaHome = () => {
    import("./pages/Manga/MangaHome"); // Substitua pelo caminho correto do arquivo da página
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <NavigationBar />
        <Search />
        <Switch>
          {/* <Route path="*" element={<ErrorPage />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/anime-page/home"
            element={<AnimeHome />}
            onLoad={prefetchAnimeHome}
          />
          <Route path="/anime-page/:id/:name/" element={<AnimeInfo />} />
          <Route
            path="/anime-page/:id/:name/:episodeNum"
            element={<WatchEpisode />}
          />
          <Route
            path="/anime-page/all-episodes/:id/:name"
            element={<ViewAllEpisodes />}
          />
          <Route
            path="/manga-page/home"
            element={<MangaHome />}
            onLoad={prefetchMangaHome}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/login" element={<Login />} />
          <Route path="/settings" element={<Settings />} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
