import styled from "styled-components";
import { shade } from "polished"

export const RecoveryForm = styled.form`
  width: 90%;
  margin: 40px 5%;
  border-radius: 8px;
  border: 3px solid ${({ theme }) => theme.representativeColor};
  background: rgba(255, 255, 255, 0.6);
  padding: 20px;

  & > h1 {
    color: black;
    font-size: 31px;
    text-align: center;
    font-weight: 400;
    margin-bottom: 20px;
  }
`;

export const RecoveryInput = styled.input`
  width: 100%;
  padding: 5px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.representativeColor};
`;

export const RecoveryButton = styled.button`
    background: ${({ theme }) => shade(0.2, theme.representativeColor)};
    padding: 20px;
`;
