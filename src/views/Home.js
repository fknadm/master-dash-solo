import React, { Fragment } from "react";
import { Container, Row, Col } from "reactstrap";

import Hero from "../components/Hero";
import Content from "../components/Content";

import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";


const Home = () => {
  const { user } = useAuth0();
  return(
  
  <Fragment>
    <Container style={{backgroundColor:"#e3e3e3"}} className="mb-5">
      <Row style={{padding:"25px"}} className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
            style={{width:"70%"}}
          />
        </Col>
        <Col md>
          <p><b>{user.name}</b></p>
          <p className="lead text-muted">Welcome, {user.nickname}</p>
        </Col>
      </Row>
    </Container>
    <Hero  />
    <hr />
    <Content />
  </Fragment>
  )
};

export default withAuthenticationRequired(Home, {
  onRedirecting: () => <Loading />,
});
