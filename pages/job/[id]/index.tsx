import Head from "next/head";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import {
  Container,
  Chip,
  Grid,
  CardHeader,
  Card,
  Avatar,
  Divider,
  LinearProgress,
} from "@material-ui/core";
import { jobViewAPI } from "../../../API/jobs";
import { useRouter } from "next/router";
import Link from "next/link";
import { Home, Search, Work } from "@material-ui/icons";
import {Header, Logo , Menu, JobCard, ActivityCard} from "../../../Components/job/style"
import Footer from "../../../Components/Footer";

export const getStaticProps = async ({ params }) => {
  const jobs = await jobViewAPI(params.id);
  return {
    props: { jobs },
  };
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

const Job: React.FC<{ jobs }> = (props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <LinearProgress />;
  }
  const { id } = router.query;

  const [grpData, setgrpData] = useState<any>({});
  useEffect(() => {
    let detailed = [];
    detailed = props.jobs.details;
    setgrpData(
      _.mapValues(_.groupBy(detailed, "code"), (clist) =>
        clist.map((detailed) => _.omit(detailed, "code"))
      )
    );
  }, []);

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
      <Container fixed>
        <JobCard src={props.jobs.attachments[0].address}></JobCard>
        <ActivityCard>
          <h1 style={{ textAlign: "center", fontSize: 24 }}>
            {props.jobs.objective}
          </h1>
          <Grid container spacing={3}>
            <Grid item md={8} xs={12}>
              <Divider style={{ margin: "15px 0" }} />
              <p className="description">
                {grpData.reason &&
                  grpData?.reason.map((mt) => <p>{mt.content}</p>)}
              </p>
              <Divider style={{ margin: "15px 0" }} />
              <h3>Responsibilities</h3>
              <p className="description">
                {grpData.responsibilities &&
                  grpData?.responsibilities.map((mt) =>
                    mt.content.split("\n").map((sp) => <p>{sp}</p>)
                  )}
              </p>
              <Divider style={{ margin: "15px 0" }} />
              <h3>Requirements</h3>
              <p className="description">
                {grpData.requirements &&
                  grpData?.requirements.map((mt) =>
                    mt.content.split("\n").map((sp) => <p>{sp}</p>)
                  )}
              </p>
              <Divider style={{ margin: "15px 0" }} />
              <h3>Benifits</h3>
              <p className="description">
                {grpData.benefits &&
                  grpData?.benefits.map((mt) => <p>{mt.content}</p>)}
              </p>
            </Grid>
            <Grid item md={4} xs={12}>
              <h5>By:</h5>   
              <Link href={`/profile/${props.jobs.owner.username}`}>
                <a>
                  <Card>
                    <CardHeader
                      avatar={<Avatar src={props.jobs.owner.picture} />}
                      title={props.jobs.owner.name}
                      subheader={props.jobs.owner.professionalHeadline}
                    />
                  </Card>
                </a></Link>
            </Grid>
          </Grid>
        </ActivityCard>
      </Container>
      <Footer />
    </>
  );
};

export default Job;
