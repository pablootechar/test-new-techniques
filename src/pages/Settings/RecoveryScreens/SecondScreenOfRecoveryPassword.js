import { useRef } from "react";


export const SecondScreenOfRecoveryPassword = () => {
    const circleRef = useRef(null);
    const checkRef = useRef(null);
    const circle = circleRef.current;
    const check = checkRef.current;

    if (circle) {
        circle.addEventListener("animationend", () => {
            check.className = "check animation";
            circle.style.display = "none";
        });
    }

    return (
        <form>
            <h1>Code sent successfully</h1>
            <h5>The password recovery code has been sent to your email. Please also check your spam folder.</h5>
            <div>
                <svg width="80" height="100" viewBox="-50 -50 100 100">
                    <circle className="loader" id="loader" cx="0" cy="0" r="45" ref={circleRef} />
                </svg>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/5610/5610944.png"
                    className="check"
                    id="check"
                    ref={checkRef}
                    alt=""
                />
            </div>
            <div onClick={() => window.location.href = "/settings/recovery-password/enter-verification-code"}>
                Ok
            </div>

        </form>
    )
}