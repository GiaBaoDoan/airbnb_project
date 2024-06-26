import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
export const AuthLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);
  return (
    <main className="AuthLayout">
      <CssContainer>
        <Outlet />
      </CssContainer>
    </main>
  );
};
const CssContainer = styled.div`
  font-family: "Montserrat";
  position: relative;
  background-image: url("https://news.airbnb.com/wp-content/uploads/sites/4/2020/04/Airbnb_Peru_Skylodge.jpg");
  height: 100vh;
  backdrop-filter: blur(10px);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .btn-submit {
    @media only screen and (max-width: 640px) {
      font-size: 14px;
      padding: 10px;
    }
    background: radial-gradient(
      circle at left,
      #ff385c 0%,
      #e61e4d 27.5%,
      #e31c5f 40%,
      #d70466 57.5%,
      #bd1e59 75%,
      #bd1e59 100%
    );
  }
  form {
    width: 600px;
    height: 600px;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 30px;
    @media only screen and (max-width: 640px) {
      width: 450px;
      padding: 20px 30px;
    }
    @media only screen and (max-width: 550px) {
      width: 350px;
      overflow-y: auto;
    }
  }
  .overlay {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
  }
  input {
    &::placeholder {
      color: gray;
    }
  }
  input,
  select {
    padding: 12px;
    border: 1px solid gray;
    border-radius: 6px;
    width: 100%;
    color: #2c3e50;
    font-size: 16px;
    @media only screen and (max-width: 640px) {
      font-size: 14px;
      padding: 10px;
    }
  }
`;
