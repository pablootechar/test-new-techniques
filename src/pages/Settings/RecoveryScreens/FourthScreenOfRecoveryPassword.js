import { SHA512 } from "crypto-js";
import { useState } from "react";
import DatabaseApi from "../../../shared/DatabaseApi"


export const FourthScreenOfRecoveryPassword = () => {
    const [error, setError] = useState();
    const [recoverPassword, setRecoverPassword] = useState();

    const setInputValues = (e) => {

        setRecoverPassword(prev => {
            const pass = {
                ...prev,
                [e.target.name]: e.target.value,
            }

            return pass;
        })
    }

    const checkPasswordIsEmptyAndIfIsEqual = (pass, confirmPass) => {

        if (typeof recoverPassword?.changePassword !== "undefined" && typeof recoverPassword?.changePasswordConfirm !== "undefined") {

            if (pass !== "" && confirmPass !== "") {

                if (pass === confirmPass) {
                    return true;
                } else {
                    return "Passwords do not match";
                }

            } else {
                return "Fill in all fields";
            }
        } else {
            return "Fill in all fields";
        }
    }

    const checkAndChangePassword = async () => {
        let pass = recoverPassword?.changePassword?.replace(/ /g, "");
        let confirmPass = recoverPassword?.changePasswordConfirm?.replace(/ /g, "");
        let cryptEmail = localStorage.getItem("@animatrix/recovery/email")
        let cryptPass = SHA512(pass).toString();

        if (checkPasswordIsEmptyAndIfIsEqual(pass, confirmPass) === true) {
            // calls the password change function
            await DatabaseApi.setNewPassword(cryptEmail, cryptPass);
            localStorage.removeItem("@animatrix/recovery/email");
            window.location.href = "/settings/recovery-password/click-the-ok-button-to-return"
        } else {
            // displays the "error" message to the user, among them are "Fill in all fields" and "Passwords do not match"
            setError(checkPasswordIsEmptyAndIfIsEqual(pass, confirmPass))
        }

    }

    return (
        <form>
            <h3>Please enter the 8-digit code.</h3>
            <input
                type="password"
                name='changePassword'
                className={error !== '' ? 'change input-error' : 'input-recovery '}
                placeholder='Password'
                onChange={(e) => setInputValues(e)}
                value={recoverPassword?.changePassword}
            />
            <input
                type="password"
                name='changePasswordConfirm'
                className={error !== '' ? 'change input-error' : 'input-recovery '}
                placeholder='Confirm password'
                onChange={(e) => setInputValues(e)}
                value={recoverPassword?.changePasswordConfirm}
            />
            {error !== '' && (
                <span className="change label error">
                    {error}
                </span>
            )}
            <div onClick={() => checkAndChangePassword()}>
                Confirm
            </div>
        </form>
    )
}