import React, { Children, Component, forceUpdate } from "react";

import { Row, Col, Table, } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import contentData from "../utils/contentData";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart, Line } from 'react-chartjs-2'

import "../App.css"
import Threadload from "./Threadload";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "./Loading";
import moment from "moment";
import "moment-timezone";

class Threadhist extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fetchcomms: [],
      showModal: true,
      selectedFile: [],
      isFilePicked: false,
      uploadedUrl: [],
      urlPayload: [],
      counter: 1,
      newUpdate: [],
      propsin: [],
      statusprop: []
    };
  }




  componentDidMount() {

    const ext = this.props.first.newdatas
    const exb = this.props.first.closedatas
    // this.setState({ statusprop: this.props.first.status })

    if (ext) {
      this.setState({ propsin: this.props.first.newdatas })
      fetch(`https://us-central1-bp-serverless.cloudfunctions.net/comms/${this.props.first.newdatas.id}`, {
        "headers": {
          "Content-Type": "application/json"
        },
        "method": "POST",
      })
        .then(response => response.json())
        .then(data => this.setState({
          fetchcomms: data
        }));

      fetch(`https://us-central1-bp-serverless.cloudfunctions.net/tick/${this.props.first.newdatas.id}`, {
        "headers": {
          "Content-Type": "application/json"
        },
        "method": "GET",
      })
        .then(response => response.json())
        .then(data => this.setState({
          statusprop: data.status
        }));


    }
    if (exb) {
      this.setState({ propsin: this.props.first.closedatas })
      fetch(`https://us-central1-bp-serverless.cloudfunctions.net/comms/${this.props.first.closedatas.id}`, {
        "headers": {
          "Content-Type": "application/json"
        },
        "method": "POST",
        // "body": JSON.stringify(value)
      })
        .then(response => response.json())
        .then(data => this.setState({
          fetchcomms: data
        }));

      fetch(`https://us-central1-bp-serverless.cloudfunctions.net/tick/${this.props.first.closedatas.id}`, {
        "headers": {
          "Content-Type": "application/json"
        },
        "method": "GET",
      })
        .then(response => response.json())
        .then(data => this.setState({
          statusprop: data.status
        }));


    }







  }



  render() {

    const handleOnChange = e => {
      const file = e.target.files[0]
      this.setState({ selectedFile: file })
      this.setState({ isFilePicked: true })


    };

    const handleText = e => {

      this.setState({ newUpdate: e.target.value })



    };


    const reloadMains = async () => {
      await fetch(
        `https://us-central1-bp-serverless.cloudfunctions.net/tick/${this.props.first.id}`,
        {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          this.setState({ statusprop: result.status })


        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    const addComm = e => {
      e.preventDefault();

      // var date = new Date().getDate();
      // var month = new Date().getMonth() + 1;
      // var year = new Date().getFullYear();

      // const todaydate = Date().toLocaleString()
      // const simpleformat = date + '/' + month + '/' + year

      const todaydate = moment().tz("Asia/Dubai").format("MMMM Do YYYY, h:mm:ss a")


      const built = {
        "addedBy": this.props.second.nickname,
        "att": this.state.urlPayload,
        "dateCreated": todaydate,
        "textContent": this.state.newUpdate,
        "forId": this.state.propsin.id
      }


      fetch(
        'https://us-central1-bp-serverless.cloudfunctions.net/comms',
        {
          method: 'POST',
          body: JSON.stringify(built),
          headers: {
            "Content-Type": "application/json"
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          this.setState({ statusprop: 'Pending' })
          // anotherApi()
          reloadMains()
          setTimeout(() => {
            window.location.reload(false)
          }, 1000);

        })
        .catch((error) => {
          console.error('Error:', error);
        });

      const newUpdate = {
        "last": this.props.second.nickname,
        "dateUpdated": todaydate,
        "status": "Pending"
      }

      fetch(
        `https://us-central1-bp-serverless.cloudfunctions.net/tick/${this.state.propsin.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(newUpdate),
          headers: {
            "Content-Type": "application/json"
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {

          window.location.reload(false)

        })
        .catch((error) => {
          console.error('Error:', error);
        });
      // window.location.reload(false)

    }


    const handleSubmit = async e => {
      e.preventDefault();

      const formData = new FormData();

      formData.append('file', this.state.selectedFile);
      formData.append('upload_preset', 'mkx5ofqs');

      fetch(
        'https://api.cloudinary.com/v1_1/xero-prime/upload',
        {
          method: 'POST',
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((result) => {
          this.setState({ uploadedUrl: result.url })
          const incurl = {
            "Link": result.url
          }


          this.setState({
            urlPayload: [...this.state.urlPayload, incurl]
          });
          this.setState(prevState => {
            return { counter: prevState.counter + 1 }
          })
        })
        .catch((error) => {
          console.error('Error:', error);
        });

    };

    const fdatas = this.state.fetchcomms
    const sorted = fdatas.sort((a, b) => a.dateCreated.localeCompare(b.dateCreated))


    const list1 = sorted.map(sorted => {
      const atts = sorted.att
      return (
        <div className="commentBox" key={sorted.id}>
          <div className="userBar" style={{ justifyContent: "space-between" }}>
            <div className="userBar">
              <img
                src={this.props.second.picture}
                alt="Profile"
                className="rounded-circle img-fluid profile-picture mb-3 mb-md-0 imgProf"
                style={{ width: "25%" }}
              />
              <h5 className="">{sorted.addedBy}</h5>
            </div>
            <div>
              <p className="dateTime"><b>Date Posted: </b>{sorted.dateCreated}</p>
            </div>
          </div>


          <div className="content_box">
            <p>{sorted.textContent}</p>
            {atts.map((atts, i) => <div className="previewMod" key={i}><img className="imgComms" src={atts.Link} /> <a href={atts.Link}>{atts.Link}</a></div>)}
          </div>


        </div>
      )
    }
    )

    const handleChangeVal = e => {
      this.setState({ statusprop: e.target.value });
    }

    const handleSubmitChange = e => {
      e.preventDefault();
      const item = { "status": this.state.statusprop }

      fetch(
        `https://us-central1-bp-serverless.cloudfunctions.net/tick/${this.state.propsin.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(item),
          headers: {
            "Content-Type": "application/json"
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          reloadMains()
          window.location.reload(false)

        })
        .catch((error) => {
          console.error('Error:', error);
        });

      setTimeout(() => {
        window.location.reload(false)
      }, 1000);

    }


    const st = this.state.propsin


    return (

      <div>
        <div style={{ fontSize: "18px" }} className="text-center hero my-5">

          <h1 className="mb-4">{st.title}</h1>
          <Row>
            {
              st.title ? <p className={st.urgency === 'High' ? 'high' : st.urgency === 'Medium' ? 'medium' : 'low'}>{st.urgency}</p> :
                <p>Unable To Load</p>
            }

            {st.title ? <p>Created By: {st.createdBy}</p> : ''}

            {st.title ? <p>Client: {st.client}</p> : ''}

            {st.title ? <p>Date Created: {st.dateCreated}</p> : ''}
            {st.title ? <p>Department: {st.lead_dept}</p> : ''}
            {st.title ? <select onChange={handleChangeVal} value={this.state.statusprop}><option value="Pending">Pending</option><option value="New">New</option><option value="Closed">Closed</option></select> : ''}
            {<button onClick={handleSubmitChange}>Update Ticket Status</button>}
          </Row>


        </div>
        <div className="next-steps my-5">
          {sorted ? list1 : <Loading />}
        </div>
        <div className="newUpdate">
          <h4>Add new update</h4>
          <form>
            <textarea className="textArea" onChange={handleText}></textarea>
          </form>


          {[...Array(this.state.counter)].map((e, i) =>
            <div id={i} key={i}>
              <form
                onSubmit={handleSubmit}
              >
                <input type="file" onChange={handleOnChange} />

                <button type="submit">Add Attachment</button>
              </form>
            </div>)}

          <button onClick={addComm} className="submitFinal">Submit Update</button>
        </div>



      </div>
    );
  }
}

export default Threadhist;
