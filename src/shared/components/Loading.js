import { styled } from "styled-components";

const Loader = styled.div`
  position: fixed;
  left: calc(50% - 75px);
  top: calc(50% - 75px);
  border-radius: 50%;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.representativeColor},
    #000000
  );
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: rotate 1s infinite linear;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
`;

const LoadingCircle = styled.div`
  border-radius: 50%;
  height: 130px;
  width: 130px;
  background: #000000;
`;

export const Loading = () => {
  return (
    <Loader>
      <LoadingCircle />
    </Loader>
  );
};
