import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FirstScreenOfRecoveryPassword, SecondScreenOfRecoveryPassword, ThirdScreenOfRecoveryPassword, FourthScreenOfRecoveryPassword, FifthScreenOfRecoveryPassword } from "./RecoveryScreens";

const BackgroundImage = styled.img`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background-size: cover;
    z-index: -10;
    filter: brightness(50%);
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100%;
    overflow: hidden;
`;

export const RecoveryPassword = () => {
    const { page } = useParams();

    const renderScreenWithImage = (Component) => {
        const imageSrc = "https://wallpaper4k.com.br/wp-content/uploads/2022/10/wallpapers-aesthetic-em-4k-para-pc-e-celular-46.gif";

        return (
          <Container>
            <BackgroundImage src={imageSrc} alt="" />
            <Component />
          </Container>
        );
      };
    
    if (page === "send-email") {
        return renderScreenWithImage(FirstScreenOfRecoveryPassword)
    } else if (page === "click-the-ok-button-to-proceed") {
        return renderScreenWithImage(SecondScreenOfRecoveryPassword)
    } else if (page === "enter-verification-code") {
        return renderScreenWithImage(ThirdScreenOfRecoveryPassword)
    } else if (page === "enter-new-password") {
        return renderScreenWithImage(FourthScreenOfRecoveryPassword)
    } else if (page === "click-the-ok-button-to-return") {
        return renderScreenWithImage(FifthScreenOfRecoveryPassword)
    } else {
        return (
            <div>oxi paizãokkkkk</div>
        )
    }
}