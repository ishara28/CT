import React, { Component } from "react";
import { Modal, Button, Form, Row } from "react-bootstrap";
import { storage, firebasedb } from "../config/firebasedb";

export class EditNews extends Component {
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
      imagesNewUrls: [],
      newsImages: [],
      progress: 0,
      preview: [],
      isUpdating: false,
    };
  }

  componentDidMount = () => {
    this.setState({
      header: this.props.news.header,
      newsType: this.props.news.newsType,
      newsContent: this.props.news.newsContent,
      headerImgUrl: this.props.news.headerImgUrl,
      imagesUrls: this.props.news.imagesUrls,
      videoLink: this.props.news.videoLink,
    });
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

  updateNews = () => {
    let data = {
      header: this.state.header,
      headerImgUrl: this.state.headerImgUrl,
      newsType: this.state.newsType,
      newsContent: this.state.newsContent,
      imagesUrls: this.state.imagesUrls,
      videoLink: this.state.videoLink,
    };

    firebasedb
      .ref("news")
      .child(this.props.news.id)
      .update(data)
      .then((snapshot) => snapshot.val())
      .catch((error) => ({
        errorCode: error.code,
        errorMessage: error.message,
      }));
    this.setState({ isUpdating: false });
  };

  handleUpload = () => {
    this.setState({ isUpdating: true });
    const { headerImage } = this.state;
    if (headerImage) {
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
              this.handleUploadMultipleImages();
              // this.updateNews();
            });
        }
      );
    } else {
      this.handleUploadMultipleImages();
    }
  };

  // Multiple Image Upload

  handleUploadMultipleImages = (e) => {
    // e.preventDefault();
    console.log(this.state.images.length);
    const promises = [];
    let counter = 0;
    const { images } = this.state;
    if (images.length) {
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
                      imagesNewUrls: [...prevState.imagesNewUrls, url],
                    };
                  },
                  () => {
                    counter++;
                    console.log(counter, url);
                    if (
                      this.state.images.length ==
                      this.state.imagesNewUrls.length
                    ) {
                      this.updateNews();
                      // setTimeout(() => {
                      //   this.setState({
                      //     header: "",
                      //     newsType: "",
                      //     newsContent: "",
                      //     headerImage: null,
                      //     headerImgUrl: "",
                      //     images: [],
                      //     imagesUrls: [],
                      //     imagesNewUrls: [],
                      //     progress: 0,
                      //     isUpdating: false,
                      //     preview: [],
                      //   });
                      // }, 4000);
                      alert("Submitted Successfully!");
                    }
                  }
                );
              });
          }
        );
      });
    } else {
      this.updateNews();
    }
  };

  render() {
    return (
      <div>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit News Here
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>
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
                  <Form.Label>
                    <b>News Type</b>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={this.state.newsType}
                    onChange={(e) =>
                      this.setState({ newsType: e.target.value })
                    }
                  >
                    <option>Choose Type</option>
                    <option>Local</option>
                    <option>International</option>
                    <option>Entertainment</option>
                    <option>Sports</option>
                    <option>Weather</option>
                    <option>Political</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>
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

                <Form.Group controlId="exampleForm.ControlFile">
                  <Form.Label>
                    <b>Header Photo</b>
                  </Form.Label>
                  <Form.Control type="file" onChange={this.handleChange} />
                </Form.Group>
              </Form>
              <br />
              {/* <progress value={this.state.progress} max="100" /> <br /> */}
              <h5>Additional Images</h5>
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
                <Form.Label>
                  <b>Video Link</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Video Link here..."
                  value={this.state.videoLink}
                  onChange={(e) => this.setState({ videoLink: e.target.value })}
                />
              </Form.Group>
              <div>
                {this.state.imagesUrls.map((url) => {
                  if (url != "") {
                    return (
                      <div
                        style={{
                          overflow: "hidden",
                          margin: 10,
                          marginHorizontal: 25,
                        }}
                      >
                        <Row>
                          <img src={url} alt="HJ" width="40%" />
                          <Button
                            variant="danger"
                            onClick={() => {
                              var filteredItems = this.state.imagesUrls.filter(
                                (item) => item != url
                              );
                              this.setState({ imagesUrls: filteredItems });
                            }}
                            style={{ height: 40, marginLeft: 20 }}
                          >
                            Remove
                          </Button>
                        </Row>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            {!this.state.isUpdating && (
              <Button variant="primary" onClick={this.handleUpload}>
                Update News
              </Button>
            )}
            {this.state.isUpdating && <p>Updating...</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default EditNews;
