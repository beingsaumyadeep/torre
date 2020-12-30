import Head from "next/head";
import React, { useEffect, useState } from "react";
import {
  ProfileCard,
  ProfileIMG,
  InfoCard,
  IMG,
  ActivityCard,
  Header,
  Logo,
  Menu,
} from "./index.style";
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
import {
  EmojiPeople,
  People,
  Category,
  Facebook,
  Twitter,
  LinkedIn,
  GitHub,
  InsertLink,
  VerifiedUser,
  Home,
  Work,
  Search
} from "@material-ui/icons";
import { profileViewAPI, profileStatsAPI } from "../../../API/profile";
import { useRouter } from "next/router";
import Converter from "../../../Components/Converter";
import { searchBySkill } from "../../../API/search";
import Link from "next/link";
import Footer from "../../../Components/Footer";

export const getStaticProps = async ({ params }) => {
  const profile = await profileViewAPI(params.id);

  const stats = await profileStatsAPI(params.id);
  return {
    props: { profile, stats },
  };
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

const Profile: React.FC<{ profile; stats }> = (props) => {
  const router = useRouter();
  const Links = (name: string) => {
    switch (name) {
      case "github":
        return <GitHub fontSize="large" />;
      case "twitter":
        return <Twitter fontSize="large" />;
      case "facebook":
        return <Facebook fontSize="large" />;
      case "linkedin":
        return <LinkedIn fontSize="large" />;
      case "":
        return <InsertLink fontSize="large" />;
      default:
        return <InsertLink fontSize="large" />;
    }
  };

  if (router.isFallback) {
    return <LinearProgress />;
  }
  const Merge = [];
  const [relatedPerson, setRelatedPerson] = useState<[]>([]);
  const [Trait, setTrait] = useState<any>([]);
  useEffect(() => {
    let merged = []
    for (let i = 0; i < props.profile.personalityTraitsResults.groups.length; i++) {
      merged.push({
        ...props.profile.personalityTraitsResults.groups[i],
        ...props.profile.personalityTraitsResults.analyses.find(
          (itmInner) =>
            itmInner.groupId ===
            props.profile.personalityTraitsResults.groups[i].id
        ),
      });
    }
    setTrait(merged)
    searchBySkill(0, props.profile.strengths[0].name, 5)
      .then((res) => {
        setRelatedPerson(res);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  return (
    <>
      <Head>
        <title>{props.profile.person.name}'s Profile - Torre</title>
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
          <div className="btn">
            <Work />
            <p>Jobs</p>
          </div>
        </Menu>
      </Header>
      <Container fixed>
        <ProfileCard img="">
          <ProfileIMG>
            <IMG src={props.profile.person.picture} />
          </ProfileIMG>
        </ProfileCard>
        <InfoCard>
          <h1>
            {props.profile.person.name}{" "}
            {props.profile.person.verified ? <VerifiedUser /> : ""}
          </h1>
          <h3>{props.profile.person.professionalHeadline}</h3>
          {props.profile.strengths.map((st) => (
            <Chip key={st.id} label={st.name} />
          ))}
        </InfoCard>
        <Grid container spacing={3}>
          <Grid item md={8} xs={12} className="profile_section">
            <ActivityCard>
              <Grid container spacing={3} className="profile_stats">
                <Grid item xs={4}>
                  <EmojiPeople fontSize="large" />
                  <p>{props.stats.signalers}</p>
                  <small>Signalers</small>
                </Grid>
                <Grid item xs={4}>
                  <People fontSize="large" />
                  <p>{props.stats.associations}</p>
                  <small>Contacts</small>
                </Grid>
                <Grid item xs={4}>
                  <Category fontSize="large" />
                  <p>{Converter(props.profile.person.weight)}</p>
                  <small>Weight</small>
                </Grid>
              </Grid>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  margin: "30px 0",
                }}
              >
                {props.profile.person.links.map((link) => (
                  <a
                    href={link.address}
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    {" "}
                    {Links(link.name)}{" "}
                  </a>
                ))}
              </div>
              <Divider />
              <h1>About</h1>
              <p className="description">{props.profile.person.summaryOfBio}</p>
            </ActivityCard>
            <ActivityCard>
              <h1>Experience</h1>
              {props.profile.jobs.map((jb) => (
                <Card>
                  <CardHeader
                    avatar={<IMG src={jb.organizations[0].picture} />}
                    title={jb.organizations[0].name}
                    subheader={jb.name}
                  />
                </Card>
              ))}
            </ActivityCard>
            <ActivityCard>
              <h1>Education</h1>
              {props.profile.education.map((jb) => (
                <Card>
                  <CardHeader
                    avatar={<IMG src={jb.organizations[0].picture} />}
                    title={jb.organizations[0].name}
                    subheader={jb.name}
                  />
                </Card>
              ))}
            </ActivityCard>
            <ActivityCard className="trait">
              <h1>Personality</h1>
              <Grid container spacing={3} style={{ fontSize: 12 }}>
                <Grid item xs={3} style={{ textAlign: "right" }}>
                  Solitary/
                  <br /> reserved
                </Grid>
                <Grid item xs={6}>
                  <LinearProgress
                    variant="buffer"
                    value={(Trait[0]?.analysis * 100) / 5}
                    valueBuffer={70}
                  />
                </Grid>
                <Grid item xs={3}>
                  Outgoing/
                  <br /> energetic
                </Grid>
              </Grid>
              <Grid container spacing={3} style={{ fontSize: 12 }}>
                <Grid item xs={3} style={{ textAlign: "right" }}>
                  Consistent/
                  <br /> cautious
                </Grid>
                <Grid item xs={6}>
                  <LinearProgress
                    variant="buffer"
                    value={(Trait[1]?.analysis * 100) / 5}
                    valueBuffer={70}
                  />
                </Grid>
                <Grid item xs={3}>
                  Inventive/
                  <br /> curious
                </Grid>
              </Grid>
              <Grid container spacing={3} style={{ fontSize: 12 }}>
                <Grid item xs={3} style={{ textAlign: "right" }}>
                  Easy-going/
                  <br /> spontaneous
                </Grid>
                <Grid item xs={6}>
                  <LinearProgress
                    variant="buffer"
                    value={(Trait[2]?.analysis * 100) / 5}
                    valueBuffer={70}
                  />
                </Grid>
                <Grid item xs={3}>
                  Efficient/
                  <br /> organized
                </Grid>
              </Grid>

              <Grid container spacing={3} style={{ fontSize: 12 }}>
                <Grid item xs={3} style={{ textAlign: "right" }}>
                  Competitive/
                  <br /> argumentative
                </Grid>
                <Grid item xs={6}>
                  <LinearProgress
                    variant="buffer"
                    value={(Trait[3]?.analysis * 100) / 5}
                    valueBuffer={70}
                  />
                </Grid>
                <Grid item xs={3}>
                  Friendly/
                  <br /> compassionate
                </Grid>
              </Grid>

              <Grid container spacing={3} style={{ fontSize: 12 }}>
                <Grid item xs={3} style={{ textAlign: "right" }}>
                  Sly/
                  <br /> avaricious
                </Grid>
                <Grid item xs={6}>
                  <LinearProgress
                    variant="buffer"
                    value={(Trait[4]?.analysis * 100) / 5}
                    valueBuffer={70}
                  />
                </Grid>
                <Grid item xs={3}>
                  Sincere/
                  <br /> modest
                </Grid>
              </Grid>

              <Grid container spacing={3} style={{ fontSize: 12 }}>
                <Grid item xs={3} style={{ textAlign: "right" }}>
                  Secure/
                  <br /> confident
                </Grid>
                <Grid item xs={6}>
                  <LinearProgress
                    variant="buffer"
                    value={(Trait[5]?.analysis * 100) / 5}
                    valueBuffer={70}
                  />
                </Grid>
                <Grid item xs={3}>
                  Sensitive/
                  <br /> nervous
                </Grid>
              </Grid>
            </ActivityCard>
          </Grid>
          <Grid item md={4} xs={12}>
            <ActivityCard>
              <h3>People also viewed</h3>
              {relatedPerson &&
                relatedPerson?.map((per: any) => (
                  <a href={`/profile/${per.username}`}>
                    <Card>
                      <CardHeader
                        avatar={
                          <Avatar aria-label="users" src={per.picture}></Avatar>
                        }
                        title={per.name}
                        subheader={per.professionalHeadline}
                      />
                    </Card>
                  </a>
                ))}
            </ActivityCard>
          </Grid>
        </Grid>
      </Container>
      <Footer/>
    </>
  );
};

export default Profile;
