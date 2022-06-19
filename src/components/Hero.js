import React from "react";
import "../App.css"
import { Container, Row, Col } from "reactstrap";
import { useHistory} from 'react-router-dom';

// const history= useHistory();

const Hero = (from) => (

  

  <div style={{ fontSize: "18px" }} className="text-center hero my-5">

    {from.data.datat ? <h1 className="mb-4">{from.data.datat}</h1> :
      from.data.title ? <h1 className="mb-4">{from.data.title}</h1> : <h1 className="mb-4">Unable To Load</h1>
    }

    <Row>
      {
        from.data.datap ? <p style={{ fontSize: "18px", width:"100%" }} className="lead"> {from.data.datap} </p> :
          from.data.title ? <p className={from.data.urgency === 'High' ? 'high' : from.data.urgency === 'Medium' ? 'medium' : 'low'}>{from.data.urgency}</p> :
            <p>Unable To Load</p>
      }

      {from.data.title ? <p>Created By: {from.data.createdBy}</p> : ''}
    
      {from.data.title ? <p>Client: {from.data.client}</p> : ''}

      {from.data.title ? <p>Date Created: {from.data.dateCreated}</p> : ''}
      {from.data.title ? <p>Department: {from.data.lead_dept}</p> : ''}
      {from.data.title ? <p>Status: {from.data.status}</p> : ''}
    </Row>


  </div>
);

export default Hero;
