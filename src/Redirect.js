export const RedirectToHomePage = () => {
  localStorage.setItem("@animatrix/current-page", "/home");
  window.location.href = "/home";
  return;
};
