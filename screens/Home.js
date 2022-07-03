import  React, {Component} from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {Header, Icon} from "react-native-elements";
import {RFValue} from "react-native-responsive-frontsize";
import WebView from "react-native-webview";
import axios from "axios";

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            articleDetails: {}
        };
    }

    componentDidMount() {
        // calling the article method
        this.getArticle();
    }

    timeConverter(num) {
        var hours = Math.floor(num/60);
        var minutes = num % 60;
        return `${hours} hrs $(minutes) min`
    }

    //creating getArticle() to get the article data
    getArticle = () => {
        const url = "https://c840-122-169-229-89.in.ngrok.io/get-article" //Providing Ngrok URL
        axios
            .get(url)
            .then(response => {
                this.state({articleDetails: response.data.data});
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    //Getting data of liked articles
    likedArticle = () =>{
        const url = "https://c840-122-169-229-89.in.ngrok.io/liked-article";
        axios
            .post(url)
            .then(response => {
                this.getArticle();
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    //Getting data of unliked articles
    unlikedArticle = () =>{
        const url = "https://c840-122-169-229-89.in.ngrok.io/unliked-article";
        axios
            .post(url)
            .then(response => {
                this.getArticle();
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    render() {
        const {articleDetails} = this.state;
        if(articleDetails.url) {
            const { url } = articleDetails;

            return (
                <View style={styles.container}>
                <View style={styles.headerContainer}>
                  <Header
                    centerComponent={{
                      text: "Article Recommended",
                      style: styles.headerTitle
                    }}
                    rightComponent={{ icon: "search", color: "#fff" }}
                    backgroundColor={"#d500f9"}
                    containerStyle={{ flex: 1 }}
                  />
                </View>
                <View style={styles.subContainer}>
                  <View style={styles.subTopContainer}>
                    <WebView source={{url}}/>
                  </View>
                    <View style={styles.lowerBottomContainer}>
                      <View style={styles.iconButtonContainer}>
                        <TouchableOpacity onPress={this.likedArticle}>
                          <Icon
                            reverse
                            name={"check"}
                            type={"entypo"}
                            size={RFValue(30)}
                            color={"#76ff03"}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.unlikedArticle}>
                          <Icon
                            reverse
                            name={"cross"}
                            type={"entypo"}
                            size={RFValue(30)}
                            color={"#ff1744"}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.buttonCotainer}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={this.notWatched}
                        >
                          <Text style={styles.buttonText}>Did not watch</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
            );
          }
          return null;
        }
      }
  
      const styles = StyleSheet.create({
          container: {
            flex: 1
          },
          headerContainer: {
            flex: 0.1
          },
          headerTitle: {
            color: "#fff",
            fontWeight: "bold",
            fontSize: RFValue(18)
          },
          subContainer: {
            flex: 0.9
          },
          subTopContainer: {
            flex: 0.4,
            justifyContent: "center",
            alignItems: "center"
          },
          posterImage: {
            width: "60%",
            height: "90%",
            resizeMode: "stretch",
            borderRadius: RFValue(30),
            marginHorizontal: RFValue(10)
          },
          subBottomContainer: {
            flex: 0.6
          },
          upperBottomContainer: {
            flex: 0.2,
            alignItems: "center"
          },
          title: {
            fontSize: RFValue(20),
            fontWeight: "bold",
            textAlign: "center"
          },
          subtitle: {
            fontSize: RFValue(14),
            fontWeight: "300"
          },
          middleBottomContainer: {
            flex: 0.35
          },
          overview: {
            fontSize: RFValue(13),
            textAlign: "center",
            fontWeight: "300",
            color: "gray"
          },
          lowerBottomContainer: {
            flex: 0.45
          },
          iconButtonContainer: {
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center"
          },
          buttonCotainer: {
            justifyContent: "center",
            alignItems: "center"
          },
          button: {
            width: RFValue(160),
            height: RFValue(50),
            borderRadius: RFValue(20),
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            marginTop: RFValue(15)
          },
          buttonText: {
            fontSize: RFValue(15),
            fontWeight: "bold"
          }
        });