"use strict;"

const React = require('react');
const ReactNative = require('react-native');
const {
    Image,
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
    ListView, 
    LinkingIOS, 
} = ReactNative;
const Icon = require("react-native-vector-icons/FontAwesome");

const Welcome = React.createClass({
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View style={styles.point}>
                        <Icon style={styles.pointIcon} name="circle" />
                        <Text style={styles.pointText}>
                            KeyPocket is a back-up system for your private keys. 
                        </Text>
                    </View>
                    <View style={styles.point}>
                        <Icon style={styles.pointIcon} name="circle" />
                        <Text style={styles.pointText}>
                            Each key is broken into "shares", which are distributed across your devices. 
                        </Text>
                    </View>
                    <View style={styles.point}>
                        <Icon style={styles.pointIcon} name="circle" />
                        <Text style={styles.pointText}>
                            By recombining shares, the secret can be recovered.  
                        </Text>
                    </View>
                    <View style={styles.point}>
                        <Icon style={styles.pointIcon} name="circle" />
                        <Text style={styles.pointText}>
                            KeyPocket has not yet undergone a security audit, so please use at your own risk.
                        </Text>
                    </View>
                    <View style={styles.point}>
                        <Icon style={styles.pointIcon} name="circle" />
                        <Text style={styles.pointText}>
                            You can review the source code on&nbsp;                
                            <Text 
                                style={{color: 'blue'}}
                                onPress={() => LinkingIOS.openURL("https://github.com/nlr/KeyPocket")}>
                                GitHub
                            </Text>. 
                        </Text>
                    </View>
                </View>
                <TouchableHighlight 
                    style={styles.button} 
                    onPress={() => this.props.navigator.pop()}
                    underlayColor="#01ddb1">
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableHighlight>
            </View>
        );
    }, 
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 10, 
        flexDirection: "column", 
        justifyContent: "space-between", 
    },
    header: {
        fontSize: 18, 
    }, 
    point: {
        flexDirection: "row", 
        marginTop: 10, 
    }, 
    pointIcon: {
        marginLeft: 10, 
        marginRight: 20, 
        marginTop: 5, 
    }, 
    pointText: { 
        flex: 1, 
        flexWrap: "wrap",  
        fontSize: 16, 
    }, 
    button: { 
        backgroundColor: "#00dcb0", 
        borderRadius: 8, 
        margin: 10, 
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center", 
        padding: 10, 
    }, 
    buttonText: {
        color: "#fff", 
        fontSize: 18, 
    }, 
});

module.exports = Welcome;