import React, { Fragment, useState } from "react";
import { Container, Row, Col } from "reactstrap";

import Hero from "../components/Hero";
import Content from "../components/Content";
import Threadload from "../components/Threadload";

import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";


const CommsHome = () => {
  const propa = {
    "datap": "Check & edit all service request tickets",
    "datat": "Service Request Tickets"
  }

  const [show, setShow] = useState(false);

  const location = useLocation()
  // const {props} = location.state
  const { user } = useAuth0();

  return(
  
  <Fragment>
    
    <Hero data={propa}/>
    <Threadload {...user}/>
    <hr />
    
  </Fragment>
  )
};

export default withAuthenticationRequired(CommsHome, {
  onRedirecting: () => <Loading />,
});
