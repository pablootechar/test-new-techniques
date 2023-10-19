import { useRef } from "react";
import styled from "styled-components";
import { RecoveryButton, RecoveryForm } from "../components";

const FormOfOkButton = styled(RecoveryForm)`
  text-align: center;
`;

const CircleChecked = styled.img`
  width: 50px;
  height: 50px;
  margin: 10px calc(50% - 25px);
  margin-top: 20px;
  animation: 0.7s zoomInScale linear forwards;

  @keyframes zoomInScale {
    0% {
      scale: 0;
    }
    100% {
      scale: 1;
    }
  }
`;

const OkButton = styled(RecoveryButton)`
  width: 50px;
  font-size: 18px;
  margin: 10px calc(50% - 25px);
`;

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
    <FormOfOkButton>
      <h1>Code sent successfully</h1>

      <h5>
        The password recovery code has been sent to your email. Please also
        check your spam folder.
      </h5>
      <div>
        <CircleChecked
          src="https://cdn-icons-png.flaticon.com/512/5610/5610944.png"
          className="check"
          id="check"
          ref={checkRef}
          alt=""
        />
      </div>
      <OkButton
        onClick={(e) => {
          e.preventDefault();
          window.location.href = "/settings/recovery-password/enter-verification-code";
        }}
      >
        Ok
      </OkButton>
    </FormOfOkButton>
  );
};
