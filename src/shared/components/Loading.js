import { styled } from "styled-components";

export const Loading = () => {
  const Loader = styled.div`
    margin: calc(50vh - 75px) auto;
    border-radius: 50%;
    background: linear-gradient(to bottom, ${({ theme }) => theme.representativeColor}, #000000);
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

  return (
    <Loader>
      <LoadingCircle />
    </Loader>
  );
};