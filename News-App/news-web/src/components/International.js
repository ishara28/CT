import React, { Component } from "react";
import { firebasedb } from "../config/firebasedb";
import OneNews from "./OneNews";
import firebase from "firebase";
import { Spinner } from "react-bootstrap";

export class International extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newsList: [],
      isLoading: true,
    };
  }

  componentDidMount = () => {
    firebasedb
      .ref("/news")
      .limitToFirst(45)
      .on("value", (querySnapshot) => {
        let data = querySnapshot.val() ? querySnapshot.val() : {};
        let newsList = { ...data };
        let newState = [];
        for (let news in newsList) {
          if (newsList[news].newsType == "International") {
            newState.push({
              id: news,
              header: newsList[news].header,
              headerImgUrl: newsList[news].headerImgUrl,
              imagesUrls: newsList[news].imagesUrls,
              newsType: newsList[news].newsType,
              newsContent: newsList[news].newsContent,
              date: newsList[news].date,
            });
          }
        }
        this.setState(
          {
            newsList: newState,
          },
          () => this.setState({ isLoading: false })
        );
      });
  };

  render() {
    let copied = [...this.state.newsList];
    if (this.state.isLoading) {
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
          <p>Loading ...</p>
        </div>
      );
    } else {
      return (
        <div className="container">
          {copied.reverse().map(function (news) {
            return (
              <OneNews
                news={news}
                handleDelete={() => {
                  firebasedb.ref("news").child(news.id).remove();
                  console.log(news.headerImgUrl);
                  var headerImgRef = firebase
                    .storage()
                    .refFromURL(news.headerImgUrl);
                  headerImgRef
                    .delete()
                    .then(function () {
                      // File deleted successfully
                    })
                    .catch(function (error) {
                      // Uh-oh, an error occurred!
                      console.log(error);
                    });
                  news.imagesUrls.map((url) => {
                    if (url != "") {
                      var imageRef = firebase.storage().refFromURL(url);
                      imageRef
                        .delete()
                        .then(function () {
                          console.log(
                            "All Additional Images Deleted Succesffully!"
                          );
                        })
                        .catch(function (error) {
                          // Uh-oh, an error occurred!
                          console.log(error);
                        });
                    }
                  });
                }}
              />
            );
          })}
        </div>
      );
    }
  }
}

export default International;
