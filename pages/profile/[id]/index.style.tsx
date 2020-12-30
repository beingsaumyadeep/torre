import styled from "styled-components";


export const ProfileCard = styled.div`
  height: 200px;
  width: 100%;
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      0deg,
      rgba(41, 41, 41, 1) 0%,
      rgba(41, 41, 41, 0.1) 100%
    );
    z-index: 0;
  }
`;
export const ProfileIMG = styled.div`
  height: 150px;
  width: 150px;
  background: #cddc39;
  position: absolute;
  bottom: -75px;
  left: calc(50% - 75px);
  clip-path: polygon(
    45% 1.33975%,
    46.5798% 0.60307%,
    48.26352% 0.15192%,
    50% 0,
    51.73648% 0.15192%,
    53.4202% 0.60307%,
    55% 1.33975%,
    89.64102% 21.33975%,
    91.06889% 22.33956%,
    92.30146% 23.57212%,
    93.30127% 25%,
    94.03794% 26.5798%,
    94.48909% 28.26352%,
    94.64102% 30%,
    94.64102% 70%,
    94.48909% 71.73648%,
    94.03794% 73.4202%,
    93.30127% 75%,
    92.30146% 76.42788%,
    91.06889% 77.66044%,
    89.64102% 78.66025%,
    55% 98.66025%,
    53.4202% 99.39693%,
    51.73648% 99.84808%,
    50% 100%,
    48.26352% 99.84808%,
    46.5798% 99.39693%,
    45% 98.66025%,
    10.35898% 78.66025%,
    8.93111% 77.66044%,
    7.69854% 76.42788%,
    6.69873% 75%,
    5.96206% 73.4202%,
    5.51091% 71.73648%,
    5.35898% 70%,
    5.35898% 30%,
    5.51091% 28.26352%,
    5.96206% 26.5798%,
    6.69873% 25%,
    7.69854% 23.57212%,
    8.93111% 22.33956%,
    10.35898% 21.33975%
  );
  padding: 5px;
`;
export const IMG = styled.div`
  height: 100%;
  min-height: 50px;
  width: 100%;
  min-width: 50px;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${(props) => props.src});
  clip-path: polygon(
    45% 1.33975%,
    46.5798% 0.60307%,
    48.26352% 0.15192%,
    50% 0,
    51.73648% 0.15192%,
    53.4202% 0.60307%,
    55% 1.33975%,
    89.64102% 21.33975%,
    91.06889% 22.33956%,
    92.30146% 23.57212%,
    93.30127% 25%,
    94.03794% 26.5798%,
    94.48909% 28.26352%,
    94.64102% 30%,
    94.64102% 70%,
    94.48909% 71.73648%,
    94.03794% 73.4202%,
    93.30127% 75%,
    92.30146% 76.42788%,
    91.06889% 77.66044%,
    89.64102% 78.66025%,
    55% 98.66025%,
    53.4202% 99.39693%,
    51.73648% 99.84808%,
    50% 100%,
    48.26352% 99.84808%,
    46.5798% 99.39693%,
    45% 98.66025%,
    10.35898% 78.66025%,
    8.93111% 77.66044%,
    7.69854% 76.42788%,
    6.69873% 75%,
    5.96206% 73.4202%,
    5.51091% 71.73648%,
    5.35898% 70%,
    5.35898% 30%,
    5.51091% 28.26352%,
    5.96206% 26.5798%,
    6.69873% 25%,
    7.69854% 23.57212%,
    8.93111% 22.33956%,
    10.35898% 21.33975%
  );
`;
export const InfoCard = styled.div`
  color: #fff;
  margin: 100px auto 15px;
  text-align: center;
  h1 {
    font-weight: 400;
    margin: 15px;
  }
  h3 {
    font-weight: 200;
    margin: 15px;
  }
  .MuiChip-root {
    margin: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14),
      0 2px 1px -1px rgba(0, 0, 0, 0.12);
  }
`;
export const ActivityCard = styled.div`
  background: #424242;
  border-radius: 5px;
  padding: 15px 30px;
  margin: 30px 0 0;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
  color: #fff;
  hr {
    margin: 15px 0;
  }
  h3,
  h1 {
    margin: 15px 0;
    font-weight: 200;
  }
  h1 {
    font-size: 18px;
  }
  .description {
    font-size: 14px;
    line-height: 1.5em;
    text-align: justify;
    font-weight: 200;
  }
  .profile_stats {
    text-align: center;
    p {
      font-size: 20px;
      font-weight: 100;
    }
    small {
      font-weight: 200;
    }
  }
  .MuiPaper-root {
    background: none;
    color: #fff;
    margin: 0 -15px;
    box-shadow: none;
    .MuiTypography-colorTextSecondary {
      color: #6d6d6d;
    }
  }
`;
export const Header = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #fff;
  /* background: #27292d; */
  background-image: linear-gradient(
    0deg,
    rgba(39, 41, 45, 0) 0%,
    rgb(39, 41, 45) 100%
  );
  /*  */
`;
export const Logo = styled.div`
  height: 100%;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;
export const Menu = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  .btn {
    width: 60px;
    border: none;
    background: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    :hover {
      background: #383b41;
    }
    p {
      margin: 5px 0 0;
      font-size: 12px;
    }
  }
`;
