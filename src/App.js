import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/global";
import darkCyan from "./styles/themes/darkCyan";
import { MobileNav } from "./components";
import darkPurple from "./styles/themes/darkPurple";
import lightCyan from "./styles/themes/lightCyan";
import lightPurple from "./styles/themes/lightPurple";
import { useState } from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
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
      } else if (localStorageTheme === "lightCyan") {
        setCurrentTheme(lightCyan);
      } else if (localStorageTheme === "lightPurple") {
        setCurrentTheme(lightPurple);
      }
    }
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <BrowserRouter>
        <GlobalStyles />
        <MobileNav />
        <Switch>
          {/* <Route path="*" element={<ErrorPage />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/anime-home" element={<AnimeHome />} />
          <Route path="/manga-home" element={<MangaHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
