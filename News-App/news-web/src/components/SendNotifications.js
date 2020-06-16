import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { firebasedb } from "../config/firebasedb";

export class SendNotifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      userExpoTokens: [],
    };
  }

  componentDidMount() {
    firebasedb.ref("/users").on("value", (querySnapshot) => {
      let data = querySnapshot.val() ? querySnapshot.val() : {};
      let newsList = { ...data };
      let newState = [];
      for (let news in newsList) {
        newState.push({
          id: news,
          expoToken: newsList[news].expoToken,
        });
      }
      this.setState(
        {
          userExpoTokens: newState,
        },
        () => console.log(this.state.userExpoTokens)
      );
    });
  }

  setReadyForSendNotifications = () => {
    // var mes = [];
    // this.state.userExpoTokens.map((token) => {
    //   mes.push({
    //     to: token.expoToken,
    //     sound: "default",
    //     title: this.state.title,
    //     body: this.state.body,
    //     _displayInForeground: true,
    //     data: {
    //       newsNotify: false,
    //     },
    //   });
    // });
    // this.setState({ messages: mes }, () => this.sendNot());
    var mes = [];
    var count = 0;
    for (var i = 0; i < this.state.userExpoTokens.length; i++) {
      console.log(this.state.userExpoTokens[i].expoToken);
      if (count < 100) {
        mes.push({
          to: this.state.userExpoTokens[i].expoToken,
          sound: "default",
          title: this.state.title,
          body: this.state.body,
          _displayInForeground: true,
          data: {
            newsNotify: false,
          },
        });
        count++;
      } else {
        this.setState({ messages: mes }, () => this.sendNot());
        count = 0;
        mes = [];
      }
    }
    this.setState({ messages: mes }, () => this.sendNot());
  };

  sendNot = () => {
    console.log("Notification  Send");
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.messages),
    })
      .then(() => console.log("Done!"))
      .then((err) => console.log(err));
  };

  // testSendExpo = () => {
  //   for (var i = 0; i < 5; i++) {
  //     firebasedb.ref("users").push({
  //       expoToken: "ExponentPushToken[wYFvYcDjD1X_GxoaauNRqV]",
  //       // expoToken: "ExponentPushToken[gw9IiFCO0LLOcPzUDg0CKc]",
  //     });
  //   }
  // };

  render() {
    return (
      <div className="container" style={{ width: "75%" }}>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label style={{ float: "left" }}>
              <b>Notification Title</b>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Notification title here..."
              value={this.state.title}
              onChange={(e) => this.setState({ title: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label style={{ float: "left" }}>
              <b>Notification Body</b>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={this.state.body}
              onChange={(e) =>
                this.setState({
                  body: e.target.value,
                })
              }
            />
          </Form.Group>
          <Button
            style={{ backgroundColor: "black" }}
            onClick={this.setReadyForSendNotifications}
          >
            Send Notification
          </Button>
          {/* <Button
            style={{ backgroundColor: "black" }}
            onClick={this.testSendExpo}
          >
            Test Enter Tokens
          </Button> */}
        </Form>
      </div>
    );
  }
}

export default SendNotifications;
