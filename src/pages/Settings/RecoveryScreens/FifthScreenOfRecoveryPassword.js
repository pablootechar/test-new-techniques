import styled from "styled-components";
import { RecoveryButton, RecoveryForm } from "../components";

const ButtonToReturnLoginPage = styled(RecoveryButton)`
    font-size: 20px;
    font-weight: 500;

    & > span {
        font-weight: 700;
    }
`;


export const FifthScreenOfRecoveryPassword = () => {

    return (
        <RecoveryForm>
            <h1>Password changed successfully.</h1>
            <ButtonToReturnLoginPage onClick={(e) => {
                e.preventDefault();
                window.location.href = "/profile/login";
            }}>
                Return to <span>login page.</span>
            </ButtonToReturnLoginPage>

        </RecoveryForm>
    )
}