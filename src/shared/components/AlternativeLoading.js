import React from "react";
import styled, { keyframes } from "styled-components";

const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
`;

const DarkenedBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingSquare = styled.div`
  width: 80px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.8);
  border: 1px solid ${({ theme }) => theme.representativeColor};
  display: flex;
  justify-content: space-around;
  padding: 0px 10px;
  padding-top: 25px;
  margin: 0 auto;
  border-radius: 20px;
`;

const JumpCircle = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ theme }) => theme.representativeColor};
  border-radius: 50%;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
`;

const AnimatedJumpCircle1 = styled(JumpCircle)`
  animation-name: ${bounceAnimation};
`;

const AnimatedJumpCircle2 = styled(JumpCircle)`
  animation-delay: 0.4s;
  animation-name: ${bounceAnimation};
`;

const AnimatedJumpCircle3 = styled(JumpCircle)`
  animation-delay: .6s;
  animation-name: ${bounceAnimation};
`;

export const AlternativeLoading = () => {
  return (
    <DarkenedBackground>
      <LoadingSquare>
        <AnimatedJumpCircle1 />
        <AnimatedJumpCircle2 />
        <AnimatedJumpCircle3 />
      </LoadingSquare>
    </DarkenedBackground>
  );
};
