import React, { Component } from "react";

import { Row, Col, Table, } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import contentData from "../utils/contentData";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart, Line } from 'react-chartjs-2'

import { NavLink } from "react-router-dom";

import "./Component.css"
import Loading from "./Loading";

class Threadload extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ticks: [],
      show: false,
      last: [],
      titleprop: [],
      clientprop: "BoldPrime",
      deptprop: "Tech",
      urgencyprop: "High",
      open: [],
      closed: []

    };
  }

  componentDidMount() {
    fetch('https://us-central1-bp-serverless.cloudfunctions.net/tick', {
      "headers": {
        "Content-Type": "application/json"
      },
      "method": "GET",
      // "body": JSON.stringify(value)
    })
      .then(response => response.json())
      // .then(data => this.setState({
      //   ticks: data
      // }))
      // .then(data => console.log(data, 'first call'))
      .then(data => {

        var opened = []
        var closedd = []

        for (let i = 0; i < data.length; i++) {
          if (data[i].status === 'New' | data[i].status === 'Pending') {
            // this.setState({ open: data[i] });
            console.log(data[i],'FILTERED')
            opened.push(data[i])
           

          }
        }
        console.log(opened,'TRANSFERRED TO OPEN________________')
      

        for (let i = 0; i < data.length; i++) {
          if (data[i].status === 'Closed') {
            // this.setState({ closed: datas[i] });
            console.log(data[i],'CLOSE FILTERED')
            closedd.push(data[i])
          }
        }

        console.log(closedd,'TRANSFERRED TO CLOSED________________')

        this.setState({closed:closedd})
        this.setState({open:opened})
      })

    console.log(this.props, 'PROPS!')


    const datas = this.state.ticks

    console.log(datas, '_________FIRST_________')




  }



  render() {

    const handleShow = () => {
      if (this.state.show) {
        this.setState({ show: false })
      }
      else {
        this.setState({ show: true })
      }
    }

    console.log(this.state.show)

    const handleClose = () => {
      this.setState({ show: false })
    }


    const handleSend = () => {
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();

      const simpleformat = date + '/' + month + '/' + year

      const i = this.state
      const payload = {
        "client": i.clientprop,
        "createdBy": this.props.nickname,
        "dateCreated": simpleformat,
        "dateUpdated": "",
        "last": "",
        "lead_dept": i.deptprop,
        "status": "New",
        "title": i.titleprop,
        "urgency": i.urgencyprop

      }

      console.log(payload)


      fetch('https://us-central1-bp-serverless.cloudfunctions.net/tick', {
        "headers": {
          "Content-Type": "application/json"
        },
        "method": "POST",
        "body": JSON.stringify(payload)
      })
        .then(response => response.json())
        .then(data => console.log(data, 'success'))

      setTimeout(() => {
        window.location.reload(false)
      }, 1000);



    }

    function handleDeletion(del) {
      fetch(`https://us-central1-bp-serverless.cloudfunctions.net/tick/${del}`, {
        "headers": {
          "Content-Type": "application/json"
        },
        "method": "DELETE",
      })
      setTimeout(() => {
        window.location.reload(false)
      }, 1000);
    }


    const handletitle = e => {
      this.setState({ titleprop: e.target.value })
    }

    const handleClient = e => {
      this.setState({ clientprop: e.target.value })
    }

    const handleDept = e => {
      this.setState({ deptprop: e.target.value })
    }

    const handleUrg = e => {
      this.setState({ urgencyprop: e.target.value })
    }



    

    const showing = this.state.show
    var x = this.state
    const newdatas = this.state.open
    const closedatas = this.state.closed
    console.log(newdatas, 'filtered')
    console.log(newdatas, 'n', closedatas, 'c')

    return (
      <div className="next-steps my-5">

        <h2 className="my-5 text-center">Open Requests</h2>
        <div className="buttonRow">
          {showing ?
            <div>
              <div className="modalbg">
              </div>
              <div className="modalWin">
                <div className="modalHeader">
                  <h2 className="upTitle">Add New Ticket</h2>
                  <p>Add your request and attach references, attachments and other formats in the thread section.</p>
                </div>

                <form className="formSubmit">
                  <div className="inputGroup1"><p className="inputlabel">Title</p>
                    <textarea value={x.titleprop} onChange={handletitle} className="titlein"></textarea></div>
                  <div className="inputGroup"><p className="inputlabel">Client</p>
                    <select value={x.clientprop} onChange={handleClient}><option value="BoldPrime">BoldPrime</option><option value="KatoPrime">katoPrime</option><option value="VectraForex">VectraForex</option><option value="LunarPips">LunarPips</option><option value="Inhouse-FB">Inhouse - FB</option><option value="Inhouse-XP">Inhouse - XP</option></select></div>
                  <div className="inputGroup">
                    <p className="inputlabel">Department</p>
                    <select value={x.deptprop} onChange={handleDept}><option value="Tech">Tech</option><option value="Operations">Operations</option><option value="MetaQuotes/Provider">MetaQuotes/Provider</option><option value="Finance">Finance</option><option value="Marketing">Marketing</option><option value="Satellite Teams">Satellite Teams</option></select></div>
                  <div className="inputGroup">
                    <p className="inputlabel">Urgency</p>
                    <select value={x.urgencyprop} onChange={handleUrg}><option value="Low">Low</option><option value="Medium">Medium</option><option value="High">High</option></select></div>
                </form>
                <div className="buttonRow">
                  <button className="submitbtn" onClick={handleSend}>Submit New Ticket</button>
                  <button className="closebtn" onClick={handleClose}>Close Ticket Window</button>
                </div>
              </div>
            </div>
            : ''}
          <button className="buttonAddTick" onClick={handleShow}>{showing ? 'Close Ticket Window' : 'Add New Ticket'}</button>
        </div>

        <Row>
          <div className="client_card">

            <div className="card-content">

              <Table className="selected">
                <thead>
                  <tr>
                    <td>Urgency</td>
                    <td>Title</td>
                    <td>Client</td>
                    <td>Date Created</td>
                    <td>Date Updated</td>
                    <td>Last Updated</td>
                    <td>Created By</td>
                    <td>Status</td>
                    <td>Lead Dept.</td>
                  </tr>
                </thead>
                <tbody>
                  {newdatas ? newdatas.map(newdatas => {
                    console.log(newdatas)
                    return (

                      <tr key={newdatas.id}>

                        <td>{newdatas.urgency == 'High' ? <p className="high">{newdatas.urgency}</p>
                          : newdatas.urgency == 'Medium' ? <p className="medium">{newdatas.urgency}</p>
                            : <p className="low">{newdatas.urgency}</p>}</td>
                        <NavLink
                          to={{
                            pathname: '/commsthread',
                            state: { newdatas }
                          }}
                        >
                          <td>{newdatas.title}</td>
                        </NavLink>
                        <td>{newdatas.client}</td>
                        <td>{newdatas.dateCreated}</td>
                        <td>{newdatas.dateUpdated}</td>
                        <td>{newdatas.last}</td>
                        <td>{newdatas.createdBy}</td>
                        <td>{newdatas.status}</td>
                        <td>{newdatas.lead_dept}</td>

                      </tr>

                    )
                  }

                  ) : <Loading />}
                </tbody>
              </Table>

            </div>
          </div>
        </Row>
        <h2 className="my-5 text-center">Closed Requests</h2>
        <Row>
          <div className="client_card">

            <div className="card-content">

              <Table className="selected">
                <thead>
                  <tr>
                    <td>Urgency</td>
                    <td>Title</td>
                    <td>Client</td>
                    <td>Date Created</td>
                    <td>Date Updated</td>
                    <td>Last Updated</td>
                    <td>Created By</td>
                    <td>Status</td>
                    <td>Lead Dept.</td>
                    <td>Delete</td>
                  </tr>
                </thead>
                <tbody>
                  {closedatas ? closedatas.map(closedatas => {
                    console.log(closedatas)
                    return (

                      <tr key={closedatas.id}>

                        <td>{closedatas.urgency == 'High' ? <p className="high">{closedatas.urgency}</p>
                          : closedatas.urgency == 'Medium' ? <p className="medium">{closedatas.urgency}</p>
                            : <p className="low">{closedatas.urgency}</p>}</td>
                        <NavLink
                          to={{
                            pathname: '/commsthread',
                            state: { closedatas }
                          }}
                        >
                          <td>{closedatas.title}</td>
                        </NavLink>
                        <td>{closedatas.client}</td>
                        <td>{closedatas.dateCreated}</td>
                        <td>{closedatas.dateUpdated}</td>
                        <td>{closedatas.last}</td>
                        <td>{closedatas.createdBy}</td>
                        <td>{closedatas.status}</td>
                        <td>{closedatas.lead_dept}</td>
                        <td> <FontAwesomeIcon className="hoverme" style={{color:"#4e5cdf"}} onClick={() => handleDeletion(closedatas.id)} icon="fa-edit" /></td>

                      </tr>

                    )
                  }

                  ) : <Loading />}
                </tbody>
              </Table>

            </div>
          </div>
        </Row>

      </div>
    );
  }
}

export default Threadload;
