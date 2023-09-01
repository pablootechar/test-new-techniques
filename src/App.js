import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/global";
import { MobileNav } from "./components";
import { useState } from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import { AnimeHome, Home, MangaHome, Profile, Settings } from "./pages";
import { darkCyan, darkPurple } from "./styles";

function App() {
  const [currentTheme, setCurrentTheme] = useState(darkCyan);
  const localStorageTheme = localStorage.getItem("currentTheme");

  useState(() => {
    if (localStorageTheme) {
      if (localStorageTheme === "darkCyan") {
        setCurrentTheme(darkCyan);
      } else if (localStorageTheme === "darkPurple") {
        setCurrentTheme(darkPurple);
      } else {
        setCurrentTheme(darkCyan);
      }
    }
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <MobileNav />
      <BrowserRouter>
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
