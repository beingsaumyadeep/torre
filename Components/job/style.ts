import styled from "styled-components";


export const JobCard = styled.div`
  height: 40vh;
  width: 100%;
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${(props) => props.src});
  border-radius: 0 0 15px 15px;
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