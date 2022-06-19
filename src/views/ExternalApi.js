import React, { Fragment,useState  } from "react";
import { Container, Row, Col } from "reactstrap";

import Hero from "../components/Hero";
import Content from "../components/Content";
import Threadhist from "../components/Threadhist";

import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useLocation, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../App.css"

const Api = () => {

  
  let history = useHistory()
let location = useLocation()
  const { user } = useAuth0();

console.log(location.state)

  const propa = {
    "datap": "Check & edit all service request tickets",
    "datat": "Service Request Tickets"
  }


const propb = {
  "first":location.state,
  "second":user
}

console.log(propb)
  
  return(
  
  <Fragment>
   <button className="back btn" onClick={history.goBack}><FontAwesomeIcon style={{color:"#b9a7ff"}} icon="chevron-circle-left" className="mr-3" />Back</button>
    {/* <Hero data={location.state.datas}/> */}
    <Threadhist {...propb}/>
    <hr />
    
  </Fragment>
  )
};

export default withAuthenticationRequired(Api, {
  onRedirecting: () => <Loading />,
});
