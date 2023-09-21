import styled from "styled-components";

const ButtonAdm = styled.div`
  position: relative;
  background: #0d0d0d;
  width: 95%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  padding: 0px 10px;
  overflow: hidden;

  & > span:nth-of-type(1) {
    position: absolute;
    top: 0;
    left: 0;
    height: 3px;
    width: 100%;
    background: linear-gradient(
      to right,
      transparent,
      ${({ theme }) => theme.representativeColor}
    );
    animation: animated-border-1 2s infinite linear;
  }

  @keyframes animated-border-1 {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  & > span:nth-of-type(2) {
    position: absolute;
    top: 0;
    right: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent,
      ${({ theme }) => theme.representativeColor}
    );
    animation: animated-border-2 2s infinite linear;
    animation-delay: 1s;
  }

  @keyframes animated-border-2 {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100%);
    }
  }

  & > span:nth-of-type(3) {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
    background: linear-gradient(
      to left,
      transparent,
      ${({ theme }) => theme.representativeColor}
    );
    animation: animated-border-3 2s infinite linear;
  }

  @keyframes animated-border-3 {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  & > span:nth-of-type(4) {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(
      to top,
      transparent,
      ${({ theme }) => theme.representativeColor}
    );
    animation: animated-border-4 2s infinite linear;
    animation-delay: 1s;
  }

  @keyframes animated-border-4 {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(-100%);
    }
  }
`;

export const AdminButton = () => {
  return (
    <ButtonAdm onClick={() => window.location.href = "/supremacy-of-the-masters-of-truco"}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <h3>User Control</h3>
      <i className="fa-solid fa-angle-right"></i>
    </ButtonAdm>
  );
};
