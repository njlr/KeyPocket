'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    AppRegistry,
    Component,
    Navigator,
    StyleSheet,
    Text,
    View,
    ListView, 
    TouchableOpacity, 
    Alert, 
} = ReactNative;

const Nav = require("./Nav.js");
const Home = require("./Home.js");
const SecretDetail = require("./SecretDetail.js");
const SecretOpen = require("./SecretOpen.js");
const Create = require("./Create.js");
const Welcome = require("./Welcome.js");
const Recover = require("./Recover.js");
const InvalidScan = require("./InvalidScan.js");
const SecretShare = require("./SecretShare.js");
const KeyPocket = require("./KeyPocket.js");
const Icon = require("react-native-vector-icons/FontAwesome");
const Realm = require("realm");

let realm = new Realm({schema: [KeyPocket.SecretSharing, KeyPocket.SecretShare]});

const KeyPocketApp = React.createClass({
    renderScene(route, navigator) {
        var scene = null;
        if (route.index == 0) {
            scene = <Home navigator={navigator} route={route} {...route.passProps} />;
        } else if (route.name == "SecretDetail") {
            scene = <SecretDetail navigator={navigator} {...route.passProps} />;
        } else if (route.name == "SecretOpen") {
            scene = <SecretOpen navigator={navigator} {...route.passProps} />;
        } else if (route.name == "Create") {
            scene = <Create navigator={navigator} {...route.passProps}/>;
        } else if (route.name == "Recover") {
            scene = <Recover navigator={navigator} {...route.passProps}/>;
        } else if (route.name == "InvalidScan") {
            scene = <InvalidScan navigator={navigator} {...route.passProps}/>;
        } else if (route.name == "SecretShare") {
            scene = <SecretShare navigator={navigator} {...route.passProps}/>;
        } else if (route.name = "Welcome") {
            scene = <Welcome navigator={navigator} {...route.passProps}/>;
        }
        if (scene) {
            return (
                <View style={{flex: 1, marginTop: 64, justifyContent: "flex-start"}}>
                    {scene}
                </View>
            );
        }
        throw new Error(
            "Unrecognized route: " + route.name + 
            ". Did you forget to update the index?");
    }, 
    render() {
        return (
            <Navigator
                style={{ flex: 1 }}
                initialRoute={{ 
                    index: 0, 
                    name: "Home", 
                    passProps: {
                        realm: realm, 
                    }
                }}
                renderScene={this.renderScene}
                navigationBar={
                    <Navigator.NavigationBar 
                        style={styles.navBar}
                        routeMapper={NavigationBarRouteMapper} />}
                        configureScene={(route) => {
                            if (route.sceneConfig) {
                                return route.sceneConfig
                            } else {
                                return Navigator.SceneConfigs.FloatFromRight
                            }
                        }
                    }/>);
    }
});

const NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        if (index == 0) {
            let callback = (x) => {
                let y = JSON.parse(x);
                if (KeyPocket.isAttributableSecretShare(y)) {
                    KeyPocket.saveAttributableSecretShare(realm, y);
                } else {
                    Alert.alert("Invalid QR Code", x);
                }
            };
            return (
                <TouchableOpacity 
                    style={styles.leftButton} 
                    onPress={() => Nav.showRecoverScreen(route, navigator, callback)}>
                    <Text style={styles.leftButtonText}>
                        <Icon style={styles.recover} name="camera" />
                    </Text>
                </TouchableOpacity>);
        }
        if (route.sceneConfig === Navigator.SceneConfigs.FloatFromBottom) {
            return (
                <TouchableOpacity style={styles.leftButton} onPress={() => navigator.pop()}>
                    <Text style={styles.leftButtonText}>
                        Done
                    </Text>
                </TouchableOpacity>);
        }
        return (
            <TouchableOpacity style={styles.leftButton} onPress={() => navigator.pop()}>
                <Text style={styles.leftButtonText}>
                    <Icon style={styles.backChevron} name="chevron-left" />
                    &nbsp;Back
                </Text>
            </TouchableOpacity>);
    },
    RightButton(route, navigator, index, navState) {
        if (index == 0) {
            let callback = (x) => {
                if (x) {
                    let shares = KeyPocket.generateShares(x);
                    realm.write(() => {
                        realm.create('SecretSharing', x);
                        for (let i of shares) {
                            realm.create("SecretShare", i);
                        }
                    });
                }
            };
            return (
                <TouchableOpacity 
                    style={styles.leftButton} 
                    onPress={() => Nav.showCreateScreen(route, navigator, callback)}>
                    <Text style={styles.leftButtonText}>
                        <Icon style={styles.create} name="plus" />
                    </Text>
                </TouchableOpacity>);
        }
    },
    Title(route, navigator, index, navState) {
        var title = route.title || "KeyPocket";
        return (<Text style={styles.navTitle}>{title}</Text>);
  }
};

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: "#00dcb0",
        alignItems: "center", 
    },
    backChevron: {
        fontSize: 14, 
        paddingLeft: 20, 
    }, 
    leftButton: {
        flex: 1,
        justifyContent: "center", 
    },
    leftButtonText: {
        color: "#fff",
        margin: 10,
        fontSize: 14, 
    },
    rightButton: { 
        flex: 1,
        justifyContent: "center", 
        paddingRight: 20, 
    }, 
    rightButtonText: { 
        color: "#fff", 
    }, 
    navTitle: {
        color: "white",
        margin: 10,
        fontSize: 16
    }, 
    recover: {
        color: "#fff", 
        fontSize: 16, 
        marginLeft: 30, 
    }, 
    create: { 
        color: "#fff", 
        fontSize: 16, 
        marginRight: 30, 
    }, 
    disclaimer: {
        backgroundColor: "#d5b044", 
        padding: 16, 
        alignItems: "center", 
        height: 48, 
    }, 
    disclaimerText: {
        color: "#fff", 
    }, 
});

AppRegistry.registerComponent("KeyPocket", () => KeyPocketApp);
