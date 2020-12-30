import Head from "next/head";
import styled from "styled-components";
import { Work } from "@material-ui/icons";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Container,
  Grid,
  Card,
  CardHeader,
  Avatar,
  CircularProgress,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { jobSearchAPI, personSearchAPI } from "../API/search";
import { useDebounce } from "react-use";
import Footer from "../Components/Footer";
import Link from "next/link";

const Home: React.FC<{}> = () => {
  const [value, setValue] = useState("job");
  const [val, setVal] = useState("");
  const [data, setData] = useState<any>([]);
  const [edit, setEdit] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [, cancel] = useDebounce(
    () => {
      if (val.length > 0) {
        if (value === "job") {
          jobSearchAPI(0, val, 3)
            .then((res) => {
              setData(res);
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
            });
        } else if (value === "person") {
          personSearchAPI(0, val, 3)
            .then((res) => {
              setData(res);
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
            });
        }
      } else {
        setData([]);
      }
    },
    2000,
    [val]
  );
  const handleChange = (event) => {
    setData([]);
    setValue(event.target.value);
  };

  useEffect(() => {}, []);
  return (
    <>
      <Head>
        <title></title>
      </Head>
      <HomeBanner>
        <div className="overlap">
          <Header>
            <Logo>Torre</Logo>
            <Menu></Menu>
          </Header>
          <div className="banner_content">
            <h1>
              Torre Professional Network <br />
              for remote and flexible work
            </h1>
            <p>
              Search accross jobs, freelance projects or people accross Torre
              Platform.
            </p>
            <div className="search_area">
              <form method="get" action="/search" style={{ width: "100%" }}>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <input
                      type="text"
                      onFocus={() => setEdit(true)}
                      onBlur={() =>
                        setTimeout(() => {
                          setEdit(false);
                        }, 3000)
                      }
                      placeholder={`Search for ${
                        value === "job"
                          ? "Jobs / Internships"
                          : value === "person"
                          ? "persons"
                          : ""
                      }`}
                      name="q"
                      value={val}
                      style={{ width: "100%", margin: "15px 0 " }}
                      onChange={({ currentTarget }) => {
                        setLoading(true);
                        setVal(currentTarget.value);
                      }}
                    />
                  </Grid>
                  <Grid item md={4} xs={9}>
                    <FormControl
                      component="fieldset"
                      style={{ margin: "7px 0" }}
                    >
                      <RadioGroup
                        aria-label="type"
                        name="type"
                        value={value}
                        onChange={handleChange}
                        row
                      >
                        <FormControlLabel
                          value="job"
                          control={<Radio size="small" color="secondary" />}
                          label="Jobs"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="person"
                          control={<Radio size="small" color="secondary" />}
                          label="Person"
                          labelPlacement="end"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item md={2} xs={3} style={{ textAlign: "right" }}>
                    <p style={{ margin: "0" }}>
                      <button className="btn btn-primary" type="submit">
                        Search
                      </button>
                    </p>
                  </Grid>
                </Grid>
              </form>
            </div>
            {edit ? (
              <div className="result-overlay">
                <div className="result">
                  <h4>Search for: {val}</h4>
                  {loading ? <CircularProgress /> : ""}
                  {value === "person"
                    ? data.map((dt: any, index) => (
                        <Link href={`/profile/${dt.username}`} key={index}>
                          <a>
                            <Card key={dt.name}>
                              <CardHeader
                                avatar={
                                  <Avatar
                                    aria-label="users"
                                    src={dt.picture}
                                  ></Avatar>
                                }
                                title={dt.name}
                                subheader={dt.professionalHeadline}
                              />
                            </Card>
                          </a>
                        </Link>
                      ))
                    : ""}
                  {value === "job"
                    ? data.map((dt: any, index) => (
                        <Link href={`/job/${dt.id}`} key={index}>
                          <a>
                            <Card key={dt.id}>
                              <CardHeader
                                avatar={
                                  <Avatar
                                    aria-label="users"
                                    src={dt.organizations[0].picture}
                                  ></Avatar>
                                }
                                title={dt.organizations[0].name}
                                subheader="September 14, 2016"
                              />
                            </Card>
                          </a>
                        </Link>
                      ))
                    : ""}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </HomeBanner>
      <section style={{ height: "100vh" }}>
        <Container fixed>
          {/* {data.map((dt) => (
            <p>{dt.organizations[0].name}</p>
          ))} */}
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <p style={{ textAlign: "center" }}>
                <img
                  src="/static/images/5.svg"
                  style={{ width: "100%", maxWidth: "200px" }}
                />
              </p>
            </Grid>
            <Grid item md={6} xs={12}>
              <ThemeText>
                <h1>Lorem Ipsum Torre Platform</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex
                </p>
              </ThemeText>
            </Grid>

            <Grid item md={6} xs={12}>
              <ThemeText>
                <h1>Lorem Ipsum Torre Platform</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex
                </p>
              </ThemeText>
            </Grid>
            <Grid item md={6} xs={12}>
              <p style={{ textAlign: "center" }}>
                <img
                  src="/static/images/9.svg"
                  style={{ width: "100%", maxWidth: "200px" }}
                />
              </p>
            </Grid>
            <Grid item md={6} xs={12}>
              <p style={{ textAlign: "center" }}>
                <img
                  src="/static/images/15.svg"
                  style={{ width: "100%", maxWidth: "200px" }}
                />
              </p>
            </Grid>
            <Grid item md={6} xs={12}>
              <ThemeText>
                <h1>Lorem Ipsum Torre Platform</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex
                </p>
              </ThemeText>
            </Grid>
          </Grid>
        </Container>
      </section>
      <Footer />
    </>
  );
};
const HomeBanner = styled.section`
  background: url(/static/images/banner.jpg);
  width: 100%;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* filter: grayscale(1); */

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      0deg,
      #292929 0%,
      rgba(39, 41, 45, 0.7) 100%
    );
    z-index: 0;
  }
  .overlap {
    position: relative;
    z-index: 1;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    .banner_content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      h1 {
        font-size: 40px;
        margin: 15px;
        font-weight: 200;
      }
      p {
        margin: 0 0 30px;
      }
      .search_area {
        background: #27292d;
        border-radius: 5px;
        min-height: 55px;
        width: 80%;
        max-width: 600px;
        /* box-shadow: -2px -2px 6px #383b40, 6px 6px 6px rgba(0, 0, 0, 0.24); */
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14),
          0 2px 1px -1px rgba(0, 0, 0, 0.12);
        display: flex;
        flex-direction: row;
        /* justify-content: center; */
        align-items: center;
        padding: 0 15px;
        input {
          border: none;
          font-size: 18px;
          margin: 7.5px;
          background: none;
          color: #cddc39;
          ::placeholder {
            color: #6d6d6d;
          }
          flex-grow: 1;
          &:focus {
            outline: none;
          }
        }
      }
      .result-overlay {
        position: relative;
        width: 80%;
        max-width: 600px;
        .result {
          position: absolute;
          width: 100%;
          margin: 15px 0;
          background: #27292d;
          border-radius: 5px;
          min-height: 55px;
          padding: 15px;
          /* box-shadow: -2px -2px 6px #383b40, 6px 6px 6px rgba(0, 0, 0, 0.24); */
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2),
            0 1px 1px rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
          .MuiPaper-root {
            background: none;
            color: #fff;
            .MuiTypography-colorTextSecondary {
              color: #6d6d6d;
            }
          }
        }
      }
    }
  }
`;
const Header = styled.div`
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
const Logo = styled.div`
  height: 100%;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;
const Menu = styled.div`
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
const ThemeText = styled.div`
  margin: 30px 15px;
  h1 {
    color: #fff;
    font-weight: 200;
    font-size: 24px;
  }
  p {
    color: #fff;
    font-weight: 200;
    font-size: 16px;
    line-height: 1.4em;
    margin: 15px 0;
  }
`;
export default Home;
