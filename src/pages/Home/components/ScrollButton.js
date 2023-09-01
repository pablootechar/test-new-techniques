import React, { useState } from "react";
import { styled } from "styled-components";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  const ButtonToScroll = styled.button`
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({ theme }) => theme.colors.textColor};
    background: ${({ theme }) => theme.colors.themeTextColor};
    border: 5px solid ${({ theme }) => theme.colors.textColor};
    place-self: start end;
    height: 70px;
    width: 200px;
    font-size: 2rem;
    border-radius: 40px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    z-index: 1;
  `;

  window.addEventListener("scroll", toggleVisible);

  return <ButtonToScroll onClick={scrollToBottom}>Learn more</ButtonToScroll>;
};

export default ScrollButton;
