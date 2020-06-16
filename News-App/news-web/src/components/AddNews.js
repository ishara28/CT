import React, { Component } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { storage, firebasedb } from "../config/firebasedb";
import { FaFileExcel } from "react-icons/fa";

export class AddNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      header: "",
      newsType: "",
      newsContent: "",
      headerImage: null,
      headerImgUrl: "",
      images: [],
      imagesUrls: [],
      videoLink: "",
      progress: 0,
      isUploading: false,
      preview: [],
      checkNotification: false,
      userExpoTokens: [],
      messages: [],
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
    let notifyNews = {
      date: Date.now(),
      header: this.state.header,
      headerImgUrl: this.state.headerImgUrl,
      imagesUrls: this.state.imagesUrls,
      newsContent: this.state.newsContent,
      newsType: this.state.newsType,
      videoLink: this.state.videoLink,
    };
    if (this.state.checkNotification) {
      var mes = [];
      this.state.userExpoTokens.map((token) => {
        mes.push({
          to: token.expoToken,
          sound: "default",
          title: this.state.newsType,
          body: this.state.header,
          _displayInForeground: true,
          data: {
            news: notifyNews,
            // header: this.state.header,
          },
        });
      });
      this.setState({ messages: mes }, () => this.sendNot());
    }
  };

  sendNot = () => {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.messages),
    }).then(() => console.log("Done!"));
  };

  handleChange = (e) => {
    if (e.target.files[0]) {
      const headerImage = e.target.files[0];
      this.setState({ headerImage });
    }
  };

  handleChangeMultipleImages = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      const path = URL.createObjectURL(e.target.files[i]);
      newImage["id"] = Math.random();
      // add an "id" property to each File object
      // setFiles((prevState) => [...prevState, newFile]);
      this.setState((prevState) => {
        return {
          ...prevState,
          images: [...prevState.images, newImage],
          preview: [...prevState.preview, path],
        };
      });
    }
  };

  submitData = () => {
    firebasedb.ref("news").push({
      header: this.state.header,
      headerImgUrl: this.state.headerImgUrl,
      imagesUrls: this.state.imagesUrls,
      newsType: this.state.newsType,
      newsContent: this.state.newsContent,
      videoLink: this.state.videoLink,
      dateToDesplay:
        new Date().getFullYear().toString() +
        "/" +
        new Date().getMonth().toString() +
        "/" +
        new Date().getDate().toString(),
      date: Date.now(),
    });
    this.setReadyForSendNotifications();
  };

  handleUpload = () => {
    if (
      this.state.header &&
      this.state.newsType &&
      this.state.newsContent &&
      this.state.headerImage
    ) {
      this.setState({ isUploading: true });
      const { headerImage } = this.state;
      const uploadTask = storage
        .ref("images/" + headerImage.name)
        .put(headerImage);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //progress function
          const progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.setState({ progress });
        },
        (error) => {
          //error function
          console.log(error);
        },
        () => {
          //complete function
          storage
            .ref("images")
            .child(headerImage.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              this.setState({ headerImgUrl: url });
              // this.submitData();
              this.handleUploadMultipleImages();
              // this.setState({ isUploading: false });
            });
        }
      );
    }
  };

  //handle upload multiple images

  handleUploadMultipleImages = (e) => {
    // e.preventDefault();
    if (this.state.images.length > 0) {
      console.log(this.state.images.length);
      this.setState({ isUploading: true });
      const promises = [];
      let counter = 0;
      // this.setState({ isUploading: true });
      const { images } = this.state;
      images.forEach((image) => {
        const uploadTask = storage.ref("images/" + image.name).put(image);
        promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            //progress function
            // const progress =
            //   Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // this.setState({ progress });
          },
          (error) => {
            //error function
            console.log(error);
          },
          () => {
            //complete function
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                this.setState(
                  (prevState) => {
                    return {
                      ...prevState,
                      imagesUrls: [...prevState.imagesUrls, url],
                    };
                  },
                  () => {
                    counter++;
                    console.log(counter, url);
                    if (
                      this.state.images.length == this.state.imagesUrls.length
                    ) {
                      this.submitData();
                      this.setState({ isUploading: false });
                      setTimeout(() => {
                        this.setState({
                          header: "",
                          newsType: "",
                          newsContent: "",
                          headerImage: null,
                          headerImgUrl: "",
                          images: [],
                          imagesUrls: [],
                          progress: 0,
                          isUploading: false,
                          preview: [],
                        });
                      }, 4000);
                      alert("Submitted Successfully!");
                    }
                  }
                );
                this.setState({ isUploading: false });
              });
          }
        );
      });
    } else {
      this.setState(
        {
          imagesUrls: [""],
          isUploading: false,
        },
        () => {
          this.submitData();
        }
      );
    }
  };

  //////////////

  render() {
    if (this.state.isUploading) {
      return (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spinner animation="grow" />
        </div>
      );
    } else {
      return (
        <div className="container" style={{ width: "60%" }}>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label style={{ float: "left" }}>
                <b>News Header</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="news header here..."
                value={this.state.header}
                onChange={(e) => this.setState({ header: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label style={{ float: "left" }}>
                <b>News Type</b>
              </Form.Label>
              <Form.Control
                as="select"
                value={this.state.newsType}
                onChange={(e) => this.setState({ newsType: e.target.value })}
              >
                <option>Choose Type</option>
                <option>Local</option>
                <option>International</option>
                <option>Political</option>
                <option>Sports</option>
                <option>Entertainment</option>
                <option>Weather</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label style={{ float: "left" }}>
                <b>News Content</b>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={this.state.newsContent}
                onChange={(e) =>
                  this.setState({
                    newsContent: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group
              controlId="formBasicCheckbox"
              style={{ textAlign: "left" }}
            >
              <Form.Check
                type="checkbox"
                label="Send Notification"
                ref="check_me"
                checked={this.state.checkNotification}
                onChange={() =>
                  this.setState((prevState) => {
                    return {
                      ...prevState,
                      checkNotification: !prevState.checkNotification,
                    };
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlFile">
              <Form.Label style={{ float: "left" }}>
                <b>Header Photo</b>
              </Form.Label>
              <Form.Control type="file" onChange={this.handleChange} />
            </Form.Group>

            {/* Multiple photos upload  */}
            <Form.Group controlId="exampleForm.ControlFile">
              <Form.Label style={{ float: "left" }}>
                <b>Extra Photos (If have)</b>
              </Form.Label>
              <Form.Control
                type="file"
                onChange={this.handleChangeMultipleImages}
                multiple
                label={"Choose Photos"}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label style={{ float: "left" }}>
                <b>Video Link</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Video Link here..."
                value={this.state.videoLink}
                onChange={(e) => this.setState({ videoLink: e.target.value })}
              />
            </Form.Group>
            <Button
              style={{ backgroundColor: "black" }}
              onClick={this.handleUpload}
            >
              Submit News
            </Button>
          </Form>
          <br />
        </div>
      );
    }
  }
}

export default AddNews;
