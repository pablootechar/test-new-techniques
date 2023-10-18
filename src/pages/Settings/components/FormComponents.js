import styled from "styled-components";

export const RecoveryForm = styled.form`
  width: 90%;
  margin: 40px 5%;
  border-radius: 8px;
  border: 3px solid ${({ theme }) => theme.representativeColor};
  background: rgba(255, 255, 255, 0.75);
  padding: 20px;

  & > h1 {
    color: black;
    font-size: 35px;
    font-weight: 500;
    margin-bottom: 20px;
}
`;

export const RecoveryInput = styled.input`
  width: 100%;
  padding: 5px;
  font-size: 18px;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.representativeColor};
`;

export const RecoveryButton = styled.button`
    background: ${({ theme }) => theme.representativeColor};
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    color: #f5f5f5;
    font-size: 16px;
    font-weight: 500;
    margin-top: 20px;
`;
