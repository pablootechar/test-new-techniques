import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  color: ${(props => props.theme.colors.textColor)};
  background-color: ${(props => props.theme.representativeColor)};
  height: 10vh;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
