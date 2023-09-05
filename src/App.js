import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/global";
import { NavigationBar } from "./shared/components";
import { useState } from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import { darkCyan, darkOrange, darkPink, darkPurple } from "./styles";
import { AnimeHome, Home, MangaHome, Profile, Settings } from "./pages";

function App() {
  const [currentTheme, setCurrentTheme] = useState(darkCyan);
  const localStorageTheme = localStorage.getItem("currentTheme");

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
      <NavigationBar />
      <BrowserRouter>
        <Switch>
          {/* <Route path="*" element={<ErrorPage />} /> */}
          <Route path="/" element={<Home />} />
          <Route
            path="/anime-home"
            element={<AnimeHome />}
            onLoad={prefetchAnimeHome}
          />
          <Route
            path="/manga-home"
            element={<MangaHome />}
            onLoad={prefetchMangaHome}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
