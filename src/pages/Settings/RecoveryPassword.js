import { useParams } from "react-router-dom"
import { FirstScreenOfRecoveryPassword, SecondScreenOfRecoveryPassword, ThirdScreenOfRecoveryPassword, FourthScreenOfRecoveryPassword, FifthScreenOfRecoveryPassword } from "./RecoveryScreens";


export const RecoveryPassword = () => {
    const { page } = useParams();

    if (page === "send-email") {
        return <FirstScreenOfRecoveryPassword />
    } else if (page === "click-the-ok-button-to-proceed") {
        return <SecondScreenOfRecoveryPassword />
    } else if (page === "enter-verification-code") {
        return <ThirdScreenOfRecoveryPassword />
    } else if (page === "enter-new-password") {
        return <FourthScreenOfRecoveryPassword />
    } else if (page === "click-the-ok-button-to-return") {
        return <FifthScreenOfRecoveryPassword />
    } else {
        return (
            <div>oxi paizãokkkkk</div>
        )
    }
}