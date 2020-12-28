import { jobSearchAPI, personSearchAPI } from "../API/search";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Container,
  IconButton,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import Head from "next/head";
import { IMG } from "./profile/[id]/index.style";
import styled from "styled-components";
import { Home } from "@material-ui/icons";
import Link from "next/link";
import Footer from "../Components/Footer";

export const getServerSideProps = async (params) => {
  if (params.query.type === "job") {
    try {
      const job = await jobSearchAPI(0, params.query.q, 50);
      return { props: { job, q: params.query.q } };
    } catch {
      return { props: {} };
    }
  } else if (params.query.type === "person") {
    try {
      const people = await personSearchAPI(0, params.query.q, 50);
      return { props: { people, q: params.query.q } };
    } catch {
      // console.log("error");
      return { props: {} };
    }
  } else return { props: {} };
};

const Search: React.FC<{}> = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <LinearProgress />;
  }
  const [Data, setData] = useState<any>(props);

  return (
    <>
      <Head>
        <title></title>
      </Head>
      <Header>
        <Logo>Torre</Logo>
        <Menu>
          <div className="btn">
            <Link href="/">
              <a>
                <Home />
                <p>Home</p>
              </a>
            </Link>
          </div>
          <div className="btn">
            <Link href="/">
              <a>
                <Search />
                <p>Search</p>
              </a>
            </Link>
          </div>
        </Menu>
      </Header>
      <Container maxWidth="sm" style={{ margin: "15px auto" }}>
        <h1 style={{ fontWeight: 200, color: "#fff" }}>Search for: {Data.q}</h1>
        {Data.job &&
          Data.job?.map((dt) => (
            <Link href={`/profile/${dt.username}`} key={dt.id}>
              <a>
                <Card>
                  <CardHeader
                    avatar={<IMG src={dt.organizations[0].picture} />}
                    title={dt.objective}
                    subheader={dt.organizations[0].name}
                  />
                  <CardContent>
                    {dt.skills.map((st) => (
                      <Chip
                        key={st.id}
                        label={st.name}
                        style={{ margin: "7.5px" }}
                      />
                    ))}
                  </CardContent>
                </Card>
              </a>
            </Link>
          ))}
        {Data.people &&
          Data.people?.map((dt) => (
            <Link href={`/profile/${dt.username}`} key={dt.username}>
              <a>
                <Card>
                  <CardHeader
                    avatar={<IMG src={dt.picture} />}
                    title={dt.name}
                    subheader={dt.professionalHeadline}
                  />
                  <CardContent>
                    {dt.skills.map((st) => (
                      <Chip
                        key={st.id}
                        label={st.name}
                        style={{ margin: "7.5px" }}
                      />
                    ))}
                  </CardContent>
                </Card>
              </a>
            </Link>
          ))}
      </Container>
      <Footer />
    </>
  );
};
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

export default Search;
