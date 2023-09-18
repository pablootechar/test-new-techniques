import { useRef, useState } from "react";
import { styled } from "styled-components";

const SearchDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  padding: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SearchButton = styled.div`
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 6px;
  border-radius: 5px;
  font-size: 18px;
  background: ${({ theme }) => theme.colors.themeTextColor};
  margin-left: 5px;
  box-shadow: 0px 0px 15px ${({ theme }) => theme.colors.themeTextColor};
`;

const InputSearch = styled.input`
  background: #000;
  border: 1px solid ${({ theme }) => theme.representativeColor};
  padding: 3px 6px;
  font-size: 18px;
  border-radius: 5px;
  outline: none;
  color: #f5f5f5;
  width: 90%;
  box-shadow: 0px 0px 15px ${({ theme }) => theme.colors.themeTextColor};
`;

export const Search = () => {
  const [showSearchButton, setShowSearchButton] = useState(true);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const inputRef = useRef();

  const handleInput = () => {
    if (inputRef.current.value === "") {
      setShowSearchButton(false);
    } else {
      setShowSearchButton(true);
    }
  };

  const buttonSearchClick = () => {
    if (showSearchButton && showSearchInput) {
      console.log(inputRef.current.value);
      if (inputRef.current.value !== "") {
        localStorage.setItem("@animatrix/text_search", inputRef.current.value);
        window.location.href = "/search";
      }
    } else {
      setShowSearchInput(true);
    }
  };

  const buttonCloseClick = () => {
    setShowSearchButton(true);
    setShowSearchInput(false);
  };

  const inputClick = () => {
    if (inputRef.current.value === "") {
      setShowSearchButton(false);
    }
  };

  const EnterKeyPress = (key) => {
    if (key === "Enter") {
      buttonSearchClick();
    }
  }

  return (
    <SearchDiv>
      {showSearchInput && (
        <InputSearch
          type="text"
          ref={inputRef}
          onClick={inputClick}
          onChange={handleInput}
          onKeyDown={(e) => EnterKeyPress(e.key)}
        />
      )}
      <SearchButton>
        {showSearchButton ? (
          <div onClick={buttonSearchClick}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        ) : (
          <div onClick={buttonCloseClick}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        )}
      </SearchButton>
    </SearchDiv>
  );
};
