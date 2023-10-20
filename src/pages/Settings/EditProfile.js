import React, { useEffect, useRef, useState } from "react";
import { Crown, Ghost } from "phosphor-react";
import DatabaseApi from "../../shared/DatabaseApi";
import { Loading, MessageModal } from "../../shared/components";
import { SHA512 } from "crypto-js";
import { styled } from "styled-components";
import { shade } from "polished";
import { ModalPhoto } from "../Profile/components/PhotoModal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-bottom: 50px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  left: 0;
  width: 100%;
  position: relative;
`;

const DivUserPhoto = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  justify-content: center;
  align-items: center;
  position: relative;

  & > img {
    height: 210px;
    width: 210px;
    border: 3px solid ${({ theme }) => theme.representativeColor};
    padding: 2px;
    margin-bottom: 20px;
    border-radius: 50%;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin: 15px 0px;

  & > span {
    width: 100%;
    font-size: 18px;
  }

  & > input {
    background: none;
    border: none;
    outline: none;
    font-size: 18px;
    color: #f5f5f5;
    width: 100%;
  }

  & > input:focus {
    border-bottom: 2px solid ${({ theme }) => theme.representativeColor};
  }

  & > div {
    position: relative;
    width: 100%;
  }

  & > div > label {
    position: absolute;
    right: 0px;
    top: -5px;
    border: 1px solid ${({ theme }) => theme.representativeColor};
    border-radius: 5px;
    padding: 1px 3px;
    background: black;
  }

  & > div > input {
    background: none;
    border: none;
    outline: none;
    font-size: 18px;
    color: #f5f5f5;
    width: 100%;
  }

  & > div > input:focus {
    border-bottom: 2px solid ${({ theme }) => theme.representativeColor};
  }
`;

const InfoTitleLine = styled.h5`
  font-weight: 300;
  margin-right: 10px;
  font-size: 18px;
  color: #8c8c8c;
`;

const PremiumPlan = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 80%;
  margin-top: 20px;
  padding: 5px;
  border: 1px solid #2d2d2d;
  background: url(https://gifs.eco.br/wp-content/uploads/2022/06/gifs-de-estrelas-caindo-11.gif);
`;

const PremiumText = styled.span`
  color: #fff700;
  font-weight: 500;
  font-size: 18px;
`;

const FreePlan = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 80%;
  margin-top: 20px;
  padding: 5px;
  border: 1px solid #2d2d2d;
  background: url(https://i.gifer.com/SFFd.gif);
`;

const FreeText = styled.span`
  color: #e0e0e0;
  font-weight: 500;
  font-size: 18px;
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 25px;
  right: 10px;
  padding: 4px;
  background: #000;
  border: 2px solid ${({ theme }) => shade(0.2, theme.representativeColor)};
  border-radius: 8px;
  color: #f5f5f5;
  font-size: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 29%;

  & > input {
    background: transparent;
    border: none;
    border-bottom: 2px solid ${({ theme }) => theme.representativeColor};
    padding: 2px 0px;
    color: #fff;
    font-size: 17px;
    font-weight: bold;
  }

  & > input::placeholder {
    font-size: 16px;
    color: ${({ theme }) => shade(0.6, theme.representativeColor)};
    font-style: italic;
    font-weight: 400;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5%;
  justify-content: space-between;
`;

const SaveButton = styled.button`
  width: 40%;
  color: #f5f5f5;
  font-weight: bold;
  font-size: 18px;
  background: ${({ theme }) => shade(0.2, theme.representativeColor)};
  border: 1px solid ${({ theme }) => shade(0.2, theme.representativeColor)};
  border-radius: 8px;
`;

const CancelButton = styled.button`
  width: 40%;
  padding: 5px 20px;
  border: 2px solid ${({ theme }) => shade(0.2, theme.representativeColor)};
  border-radius: 8px;
  background: transparent;
  color: #f5f5f5;
  font-weight: bold;
  font-size: 18px;
`;

export function SettingsEditProfile() {
  const [userInfo, setUserInfo] = useState();
  const [userPhoto, setUserPhoto] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showReturnUpdatePhoto, setShowReturnUpdatePhoto] = useState(false);
  const loggedUser = JSON.parse(localStorage.getItem("@animatrix/profile")) || undefined;
  const updatedPhoto = localStorage.getItem("@animatrix/recent-update-photo") || undefined;
  const newPhotoId = localStorage.getItem("@animatrix/new-photo-id");
  const currentPhotoId = localStorage.getItem("@animatrix/user-photoId");
  const [showPasswordInputGroup, setShowPasswordInputGroup] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);
  const [errorToCloseInputGroup, setErrorToCloseInputGroup] = useState(false);
  const [errorInChangePassword, setErrorInChangePassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let showModalUpdatedPhoto = 0;
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();
  const userNameInputRef = useRef();
  const [userNameLength, setUserNameLength] = useState(userInfo?.name?.length);

  async function setEssentialInfo() {
    const email = SHA512(loggedUser?.email).toString();
    let infoUser = await DatabaseApi.isLogged(email);
    let imageUrl = await DatabaseApi.getImageUrl(newPhotoId || infoUser?.photoId);
    setUserInfo(infoUser);
    setUserPhoto(imageUrl);
  }

  useEffect(() => {
    async function fetchData() {
      if (updatedPhoto && showModalUpdatedPhoto === 0) {
        setShowReturnUpdatePhoto(true);
      }

      await setEssentialInfo();
    }

    fetchData();
  }, []);

  setTimeout(() => {
    setUserNameLength(userNameInputRef?.current?.value?.length);
  }, 1000);

  const saveButtonClick = () => {
    const changedUserName = userNameInputRef?.current?.value === userInfo?.name ? false : true;
    const oldPasswordIsCorrect = oldPasswordRef?.current?.value === loggedUser?.password ? true : false;
    const newPasswordIsMatched = newPasswordRef?.current?.value === confirmNewPasswordRef?.current?.value ? true : false;

    
    if (typeof oldPasswordRef?.current?.value !== "undefined") {
      if (oldPasswordRef?.current?.value === "") {
        setErrorInChangePassword(true)
        return setErrorMessage("There can be no empty fields!");
      }
      
      if (oldPasswordIsCorrect) {
        if (newPasswordRef?.current?.value === "" || confirmNewPasswordRef?.current?.value === "") {
          setErrorInChangePassword(true)
          return setErrorMessage("There can be no empty fields!");
        } else {
          if (newPasswordIsMatched) {
            const encryptedEmail = SHA512(loggedUser?.email).toString();
            const encryptedPassword = SHA512(newPasswordRef?.current?.value).toString();

            async function handlePassword () {
              await DatabaseApi.setNewPassword(encryptedEmail, encryptedPassword);
            }

            handlePassword();
            console.log("trocou a senha");
          } else {
            setErrorInChangePassword(true)
            return setErrorMessage("Passwords do not match");
          }
        }
      } else {
        setErrorInChangePassword(true)
        return setErrorMessage("Old passwords don't match");
      }
      
    }

    if (changedUserName) {
      async function handleNickname () {
        await DatabaseApi.setNewNickName(userInfo?.id, userNameInputRef.current.value);
      }
  
      console.log("trocou o nome");
      handleNickname();
    }

    
    if (currentPhotoId !== newPhotoId) {
      async function setNewPhoto (photo_id) {
        await DatabaseApi.setNewUserPhoto(loggedUser?.id, photo_id);
      }

      setNewPhoto(newPhotoId);
      localStorage.removeItem("@animatrix/new-photo-id");
    }

    const newUserInfos = {
      id: loggedUser?.id,
      email: loggedUser?.email,
      password: confirmNewPasswordRef?.current?.value || loggedUser?.password,
      premium: loggedUser?.premium,
    }
    
    localStorage.setItem("@animatrix/user-photoId", userInfo?.photoId);
    localStorage.setItem("@animatrix/profile", JSON.stringify(newUserInfos));
    setTimeout(() => {
      window.location.href = "/settings";
    }, 1200)
  };

  const cancelButtonClick = () => {
    localStorage.removeItem("@animatrix/new-photo-id");
    window.location.href = "/settings";
  }
  
  const resetUserNameLength = () => {
    setUserNameLength(userNameInputRef?.current?.value?.length);
  };

  const showInputGroup = () => {
    if (showPasswordInputGroup) {
      if (
        confirmNewPasswordRef.current.value.length >= 1 ||
        oldPasswordRef?.current?.value.length >= 1 ||
        newPasswordRef?.current?.value.length >= 1
      ) {
        setErrorToCloseInputGroup(true);
        setErrorMessage(
          "You cannot close this tab while the text fields contain something written"
        );
        return;
      } else {
        return setShowPasswordInputGroup(!showPasswordInputGroup);
      }
    } else {
      setShowPasswordInputGroup(!showPasswordInputGroup);
    }
  };

  return (
    <Container>
      {showModal && <ModalPhoto isOpen={showModal} setOpen={setShowModal} />}

      {typeof loggedUser !== "undefined" ? (
        <>
          {typeof userInfo !== "undefined" ? (
            <Content>
              {/* {showReturnUpdatePhoto &&
                ((showModalUpdatedPhoto = 10),
                (
                  <MessageModal
                    typeMessage="success"
                    textMessage="Your profile photo has been changed successfully!"
                    modalState={showReturnUpdatePhoto}
                    handleStateOfModal={setShowReturnUpdatePhoto}
                  />
                ))} */}
              {errorToCloseInputGroup && (
                <MessageModal
                  typeMessage="error"
                  textMessage={errorMessage}
                  modalState={errorToCloseInputGroup}
                  handleStateOfModal={setErrorToCloseInputGroup}
                />
              )}
              {errorInChangePassword && (
                <MessageModal
                  typeMessage="error"
                  textMessage={errorMessage}
                  modalState={errorInChangePassword}
                  handleStateOfModal={setErrorInChangePassword}
                />
              )}
              <UserInfo>
                <DivUserPhoto>
                  <EditButton onClick={() => setShowModal(!showModal)}>
                    <i className="fa-solid fa-pen"></i>
                  </EditButton>
                  <img
                    src={userPhoto}
                    alt=""
                    onClick={() => setShowModal(!showModal)}
                  />
                </DivUserPhoto>
                <div>
                  <Info>
                    <InfoTitleLine>Name:</InfoTitleLine>
                    <div>
                      <input
                        type="text"
                        id="input-user-name"
                        defaultValue={userInfo.name}
                        maxLength={20}
                        onFocus={() => setShowEditButton(!showEditButton)}
                        onBlur={() => setShowEditButton(!showEditButton)}
                        onChange={resetUserNameLength}
                        ref={userNameInputRef}
                      />
                      {showEditButton ? (
                        <label htmlFor="input-user-name">
                          <i className="fa-solid fa-pen"></i>
                        </label>
                      ) : (
                        <label htmlFor="input-user-name">
                          {userNameLength}/20
                        </label>
                      )}
                    </div>
                  </Info>
                  <Info>
                    <InfoTitleLine>Email:</InfoTitleLine>
                    <span>{loggedUser?.email}</span>
                  </Info>
                  <Info>
                    <InfoTitleLine>Password:</InfoTitleLine>
                    <div>
                      <label
                        htmlFor="old-password-input"
                        onClick={showInputGroup}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </label>
                      <input
                        name="password-input"
                        value={loggedUser?.password}
                        type="password"
                        disabled
                      />
                    </div>
                  </Info>
                  {showPasswordInputGroup && (
                    <InputGroup>
                      <input
                        id="old-password-input"
                        type="password"
                        placeholder="enter your old password"
                        ref={oldPasswordRef}
                      />
                      <input
                        name="new-password-input"
                        type="password"
                        placeholder="enter your new password"
                        ref={newPasswordRef}
                      />
                      <input
                        name="confirm-new-password-input"
                        type="password"
                        placeholder="confirm your new password"
                        ref={confirmNewPasswordRef}
                      />
                    </InputGroup>
                  )}
                  <ButtonGroup>
                    <CancelButton
                      onClick={cancelButtonClick}
                    >
                      Cancel
                    </CancelButton>
                    <SaveButton onClick={saveButtonClick}>Save</SaveButton>
                  </ButtonGroup>
                </div>
                {userInfo?.isPremium === 1 ? (
                  <PremiumPlan>
                    <PremiumText>Premium Plan</PremiumText>
                    <Crown
                      style={{ marginLeft: "20px" }}
                      size={28}
                      color="#fff700"
                    />
                  </PremiumPlan>
                ) : (
                  <FreePlan>
                    <FreeText>Plano Gratuito</FreeText>
                    <Ghost
                      size={32}
                      style={{ marginLeft: "20px" }}
                      color="#e0e0e0"
                    />
                  </FreePlan>
                )}
              </UserInfo>
            </Content>
          ) : (
            <Loading />
          )}
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
}
