import React, { Component } from "react";

import { Row, Col, Table, } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import contentData from "../utils/contentData";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart, Line } from 'react-chartjs-2'

import "../App.css"

class Content extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bpdata: [],
      bphist: [],
      kphist: [],
      kpdata: [],
      lphist: [],
      lpdata: [],
      vfhist: [],
      vfdata: []
    };
  }

  componentDidMount() {
    fetch('https://us-central1-bp-serverless.cloudfunctions.net/apiforapp', {
      "headers": {
        "Content-Type": "application/json"
      },
      "method": "GET",
      // "body": JSON.stringify(value)
    })
      .then(response => response.json())
      .then(data => this.setState({
        bpdata: data
      }));

    fetch('https://us-central1-bp-serverless.cloudfunctions.net/apiforhist', {
      "headers": {
        "Content-Type": "application/json"
      },
      "method": "GET",
      // "body": JSON.stringify(value)
    })
      .then(response => response.json())
      .then(data => this.setState({
        bphist: data
      }));

      fetch('https://us-central1-bp-serverless.cloudfunctions.net/kp_apiforapp', {
      "headers": {
        "Content-Type": "application/json"
      },
      "method": "GET",
      // "body": JSON.stringify(value)
    })
      .then(response => response.json())
      .then(data => this.setState({
        kpdata: data
      }));

    fetch('https://us-central1-bp-serverless.cloudfunctions.net/kp_apiforhist', {
      "headers": {
        "Content-Type": "application/json"
      },
      "method": "GET",
      // "body": JSON.stringify(value)
    })
      .then(response => response.json())
      .then(data => this.setState({
        kphist: data
      }));

      fetch('https://us-central1-bp-serverless.cloudfunctions.net/lp_apiforapp', {
        "headers": {
          "Content-Type": "application/json"
        },
        "method": "GET",
        // "body": JSON.stringify(value)
      })
        .then(response => response.json())
        .then(data => this.setState({
          lpdata: data
        }));
  
      fetch('https://us-central1-bp-serverless.cloudfunctions.net/lp_apiforhist', {
        "headers": {
          "Content-Type": "application/json"
        },
        "method": "GET",
        // "body": JSON.stringify(value)
      })
        .then(response => response.json())
        .then(data => this.setState({
          lphist: data
        }));

        fetch('https://us-central1-bp-serverless.cloudfunctions.net/vf_apiforapp', {
          "headers": {
            "Content-Type": "application/json"
          },
          "method": "GET",
          // "body": JSON.stringify(value)
        })
          .then(response => response.json())
          .then(data => this.setState({
            vfdata: data
          }));
    
        fetch('https://us-central1-bp-serverless.cloudfunctions.net/vf_apiforhist', {
          "headers": {
            "Content-Type": "application/json"
          },
          "method": "GET",
          // "body": JSON.stringify(value)
        })
          .then(response => response.json())
          .then(data => this.setState({
            vfhist: data
          }));
  


  }

  render() {
    const bpdatas = this.state.bpdata
    const bphist = this.state.bphist
    const kpdatas = this.state.kpdata
    const kphist = this.state.kphist
    const lpdatas = this.state.lpdata
    const lphist = this.state.lphist
    const vfdatas = this.state.vfdata
    const vfhist = this.state.vfhist

    var date = [];
    var deposits = [];
    var withdrawals = [];
    for (let i = 0; i < bphist.length; i++) {

      date.push(bphist[i].date)

      var testremo = bphist[i].this_tf_deposit.replace(/[^0-9.]/g, '')
      var values = parseFloat(testremo)
      deposits.push(values)

      var testremowd = bphist[i].this_tf_withdraw.replace(/[^0-9.]/g, '')
      var valueswd = parseFloat(testremowd)
      withdrawals.push(valueswd)




    }

    var datekp = [];
    var depositskp = [];
    var withdrawalskp = [];
    for (let i = 0; i < kphist.length; i++) {

      datekp.push(kphist[i].date)

      var testremokp = kphist[i].this_tf_deposit.replace(/[^0-9.]/g, '')
      var valueskp = parseFloat(testremokp)
      depositskp.push(valueskp)

      var testremowdkp = kphist[i].this_tf_withdraw.replace(/[^0-9.]/g, '')
      var valueswdkp = parseFloat(testremowdkp)
      withdrawalskp.push(valueswdkp)
    }

      var datelp = [];
    var depositslp = [];
    var withdrawalslp = [];
    for (let i = 0; i < lphist.length; i++) {

      datelp.push(lphist[i].date)

      var testremolp = lphist[i].this_tf_deposit.replace(/[^0-9.]/g, '')
      var valueslp = parseFloat(testremolp)
      depositslp.push(valueslp)

      var testremowdlp = lphist[i].this_tf_withdraw.replace(/[^0-9.]/g, '')
      var valueswdlp = parseFloat(testremowdlp)
      withdrawalslp.push(valueswdlp)

    }


    var datevf = [];
    var depositsvf = [];
    var withdrawalsvf = [];
    for (let i = 0; i < vfhist.length; i++) {

      datevf.push(vfhist[i].date)

      var testremovf = vfhist[i].this_tf_deposit.replace(/[^0-9.]/g, '')
      var valuesvf = parseFloat(testremovf)
      depositsvf.push(valuesvf)

      var testremowdvf = vfhist[i].this_tf_withdraw.replace(/[^0-9.]/g, '')
      var valueswdvf = parseFloat(testremowdvf)
      withdrawalsvf.push(valueswdvf)

    }

    

    const dataset = {
      labels: date,
      datasets: [
        {
          label: "Deposits",
          data: deposits,
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)"
        },
        {
          label: "Withdrawals",
          data: withdrawals,
          fill: true,
          borderColor: "#a82c2c",
          backgroundColor: "rgba(231, 48, 48, 0.61)",
        }
      ]
    };

    const datasetkp = {
      labels: datekp,
      datasets: [
        {
          label: "Deposits",
          data: depositskp,
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)"
        },
        {
          label: "Withdrawals",
          data: withdrawalskp,
          fill: true,
          borderColor: "#a82c2c",
          backgroundColor: "rgba(231, 48, 48, 0.61)",
        }
      ]
    };

    const datasetlp = {
      labels: datelp,
      datasets: [
        {
          label: "Deposits",
          data: depositslp,
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)"
        },
        {
          label: "Withdrawals",
          data: withdrawalslp,
          fill: true,
          borderColor: "#a82c2c",
          backgroundColor: "rgba(231, 48, 48, 0.61)",
        }
      ]
    };

    const datasetvf = {
      labels: datevf,
      datasets: [
        {
          label: "Deposits",
          data: depositsvf,
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)"
        },
        {
          label: "Withdrawals",
          data: withdrawalsvf,
          fill: true,
          borderColor: "#a82c2c",
          backgroundColor: "rgba(231, 48, 48, 0.61)",
        }
      ]
    };

    return (
      <div className="next-steps my-5">
        <h2 className="my-5 text-center">Client Statistics</h2>
        <p style={{ textAlign: "center" }}>Track client progress here</p>
        <Row>
          <div className="client_card">

            <div className="header_card text-center">
              <img className="client_logo" src="https://my.boldprime.com/uploads/public/assets/2022/01/19/2f6eee711ec931ac3aa93882049c4078.png" />
              <h4><b>Bold Prime Limited</b></h4>
            </div>

            <div className="card-content">
              <Line data={dataset} />
              {bpdatas.map(bpdatas => {

                const test = bpdatas.this_tf_deposit
                const testrem = test.replace(/[^0-9.]/g, '')

                const testint = parseFloat(testrem).toFixed(2)


                const test2 = bpdatas.this_tf_withdraw
                const testrem2 = test2.replace(/[^0-9.]/g, '')

                const testint2 = parseFloat(testrem2).toFixed(2)


                const sum = Number(testint) - Number(testint2)

                let i = sum.length

                return (

                  <div key={bpdatas.id}>
                    <h5 className="">{bpdatas.timeframe}</h5>
                    <div className="table_data">
                      <Table style={{ width: "30%" }}>
                        <tbody>
                          <tr>
                            <td>Deposit</td>
                            <td><b>{bpdatas.this_tf_deposit}</b></td>
                          </tr>
                        </tbody>
                      </Table>
                      <Table style={{ width: "30%" }}>
                        <tbody>
                          <tr>
                            <td>Withdraw</td>
                            <td style={{ color: "red" }}><b>{bpdatas.this_tf_withdraw}</b></td>
                          </tr>
                        </tbody>
                      </Table>
                      <Table style={{ width: "30%" }}>
                        <tbody>
                          <tr>
                            <td>Net</td>
                            <td style={{ color: "green" }}><b>{sum} USD</b></td>
                          </tr>
                        </tbody>
                      </Table>
                      <Table style={{ width: "30%" }}>
                        <tbody>
                          <tr>
                            <td>Average Deposit</td>
                            <td><b>{bpdatas.average_dp} USD</b></td>
                          </tr>
                        </tbody>
                      </Table>
                      <Table style={{ width: "30%" }}>
                        <tbody>
                          <tr>
                            <td>Total PNL</td>
                            <td style={{ color: "green" }}><b>{bpdatas.tpnl} USD</b></td>
                          </tr>
                        </tbody>
                      </Table>
                      <Table style={{ width: "30%" }}>
                        <tbody>
                          <tr>
                            <td>Avail. WD</td>
                            <td><b>{bpdatas.awd} USD</b></td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>


                  </div>
                )
              }

              )}

            </div>
          </div>
        </Row>

        <Row>
          <div className="client_card">

            <div className="header_card text-center">
              <img className="client_logo" src="https://fx.katoprime.com/uploads/public/assets/2021/09/29/0624b18f01da35a7fa6c6108abb40dc1.png" />
              <h4><b>Kato Prime Limited</b></h4>
            </div>

            <div className="card-content">
              <Line data={datasetkp} />
              {kpdatas.map(kpdatas => {
                
                const test = kpdatas.this_tf_deposit
                const testrem = test.replace(/[^0-9.]/g, '')

                const testint = parseFloat(testrem).toFixed(2)


                const test2 = kpdatas.this_tf_withdraw
                const testrem2 = test2.replace(/[^0-9.]/g, '')

                const testint2 = parseFloat(testrem2).toFixed(2)


                const sum = Number(testint) - Number(testint2)


                let i = sum.length

                return (

                  <div key={kpdatas.id}>
                    <h5 className="">{kpdatas.timeframe}</h5>
                    <div className="table_data">
                      <Table style={{ width: "30%" }}>
                        <tbody>
                          <tr>
                            <td>Deposit</td>
                            <td><b>{kpdatas.this_tf_deposit}</b></td>
                          </tr>
                        </tbody>
                      </Table>
                      <Table style={{ width: "30%" }}>
                        <tbody>
                          <tr>
                            <td>Withdraw</td>
                            <td style={{ color: "red" }}><b>{kpdatas.this_tf_withdraw}</b></td>
                          </tr>
                        </tbody>
                      </Table>
                      <Table style={{ width: "30%" }}>
                        <tbody>
                          <tr>
                            <td>Net</td>
                            <td style={{ color: "green" }}><b>{sum} USD</b></td>
                          </tr>
                        </tbody>
                      </Table>
                      <Table style={{ width: "30%" }}>
                        <tbody>
                          <tr>
                            <td>Average Deposit</td>
                            <td><b>{kpdatas.average_dp} USD</b></td>
                          </tr>
                        </tbody>
                      </Table>
                      <Table style={{ width: "30%" }}>
                        <tbody>
                          <tr>
                            <td>Total PNL</td>
                            <td style={{ color: "green" }}><b>{kpdatas.tpnl} USD</b></td>
                          </tr>
                        </tbody>
                      </Table>
                      <Table style={{ width: "30%" }}>
                        <tbody>
                          <tr>
                            <td>Avail. WD</td>
                            <td><b>{kpdatas.awd} USD</b></td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>


                  </div>
                )
              }

              )}

            </div>
          </div>
        </Row>

        <Row>
          <div className="client_card">

            <div className="header_card text-center">
              <img className="client_logo" src="https://secure.lunarpips.com/uploads/public/assets/2022/02/21/209ccb1c09da0d0c2e8723ed11c46d78.png" />
              <h4><b>LunarPips Limited</b></h4>
            </div>

            <div className="card-content">
              <Line data={datasetlp} />
              {lpdatas.map(lpdatas => {
                
                const test = lpdatas.this_tf_deposit
                const testrem = test.replace(/[^0-9.]/g, '')

                const testint = parseFloat(testrem).toFixed(2)


                const test2 = lpdatas.this_tf_withdraw
                const testrem2 = test2.replace(/[^0-9.]/g, '')

                const testint2 = parseFloat(testrem2).toFixed(2)


                const sum = Number(testint) - Number(testint2)


                // let i = sum.length

                return (

                  <div key={lpdatas.id}>
                    <h5 className="">{lpdatas.timeframe}</h5>
                    <div className="table_data">
                      <Table style={{ width: "30%" }}>
                        <tbody>
                          <tr>
                            <td>Deposit</td>
                            <td><b>{lpdatas.this_tf_deposit}</b></td>
                          </tr>
                        </tbody>
                      </Table>
                      <Table style={{ width: "30%" }}>
                        <tbody>
                          <tr>
                            <td>Withdraw</td>
                            <td style={{ color: "red" }}><b>{lpdatas.this_tf_withdraw}</b></td>
                          </tr>
                        </tbody>
                      </Table>
                      <Table style={{ width: "30%" }}>
                        <tbody>
                          <tr>
                            <td>Net</td>
                            <td style={{ color: "green" }}><b>{sum} USD</b></td>
                          </tr>
                        </tbody>
                      </Table>
                      <Table style={{ width: "30%" }}>
                        <tbody>
                          <tr>
                            <td>Average Deposit</td>
                            <td><b>{lpdatas.average_dp} USD</b></td>
                          </tr>
                        </tbody>
                      </Table>
                      <Table style={{ width: "30%" }}>
                        <tbody>
                          <tr>
                            <td>Total PNL</td>
                            <td style={{ color: "green" }}><b>{lpdatas.tpnl} USD</b></td>
                          </tr>
                        </tbody>
                      </Table>
                      <Table style={{ width: "30%" }}>
                        <tbody>
                          <tr>
                            <td>Avail. WD</td>
                            <td><b>{lpdatas.awd} USD</b></td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>


                  </div>
                )
              }

              )}

            </div>
          </div>
        </Row>

        <Row>
          <div className="client_card">

            <div className="header_card text-center">
              <img className="client_logo" src="https://dashboard.vectraforex.com/uploads/public/assets/2022/03/08/3748c568bf956777df6fa24fa53008b1.png" />
              <h4><b>Vectra Forex Limited</b></h4>
            </div>

            <div className="card-content">
              <Line data={datasetvf} />
              {vfdatas.map(vfdatas => {
                
                const test = vfdatas.this_tf_deposit
                const testrem = test.replace(/[^0-9.]/g, '')

                const testint = parseFloat(testrem).toFixed(2)


                const test2 = vfdatas.this_tf_withdraw
                const testrem2 = test2.replace(/[^0-9.]/g, '')

                const testint2 = parseFloat(testrem2).toFixed(2)


                const sum = Number(testint) - Number(testint2)


                // let i = sum.length

                return (

                  <div key={vfdatas.id}>
                    <h5 className="">{vfdatas.timeframe}</h5>
                    <div className="table_data">
                      <Table style={{ width: "30%" }}>
                        <tbody>
                          <tr>
                            <td>Deposit</td>
                            <td><b>{vfdatas.this_tf_deposit}</b></td>
                          </tr>
                        </tbody>
                      </Table>
                      <Table style={{ width: "30%" }}>
                        <tbody>
                          <tr>
                            <td>Withdraw</td>
                            <td style={{ color: "red" }}><b>{vfdatas.this_tf_withdraw}</b></td>
                          </tr>
                        </tbody>
                      </Table>
                      <Table style={{ width: "30%" }}>
                        <tbody>
                          <tr>
                            <td>Net</td>
                            <td style={{ color: "green" }}><b>{sum} USD</b></td>
                          </tr>
                        </tbody>
                      </Table>
                      <Table style={{ width: "30%" }}>
                        <tbody>
                          <tr>
                            <td>Average Deposit</td>
                            <td><b>{vfdatas.average_dp} USD</b></td>
                          </tr>
                        </tbody>
                      </Table>
                      <Table style={{ width: "30%" }}>
                        <tbody>
                          <tr>
                            <td>Total PNL</td>
                            <td style={{ color: "green" }}><b>{vfdatas.tpnl} USD</b></td>
                          </tr>
                        </tbody>
                      </Table>
                      <Table style={{ width: "30%" }}>
                        <tbody>
                          <tr>
                            <td>Avail. WD</td>
                            <td><b>{vfdatas.awd} USD</b></td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>


                  </div>
                )
              }

              )}

            </div>
          </div>
        </Row>

      </div>
    );
  }
}

export default Content;
