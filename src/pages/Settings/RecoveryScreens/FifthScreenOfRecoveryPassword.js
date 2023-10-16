

export const FifthScreenOfRecoveryPassword = () => {

    return (
        <form>
            <h3>Password changed successfully.</h3>
            <div onClick={() => {
                window.location.href = "/profile/login";
            }}>
                Return to <strong>login page.</strong>
            </div>

        </form>
    )
}