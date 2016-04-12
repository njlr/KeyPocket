import React, {
    Component,
    Navigator,
    StyleSheet,
    Text,
    View,
    ListView, 
    TouchableOpacity, 
    Alert
} from "react-native";

var QRCodeView = require("react-native-qrcode-view");

const SecretShare = React.createClass({
    render() {
        var qrContent = JSON.stringify(this.props.attributableSecretShare);
        return (<View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.qrContainer}>
                    <QRCodeView 
                        data={qrContent} 
                        style={styles.qr}
                        dimension={300} />
                </View>
                <Text style={styles.label}>{this.props.attributableSecretShare.uuid}</Text>
                <Text style={styles.label}>{
                    "1 of " + 
                    this.props.attributableSecretShare.secretNumberOfShares + 
                    " shares of " + 
                    this.props.attributableSecretShare.secretName}</Text>
            </View>
        </View>);
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        flex: 1, 
        margin: 10, 
        flexDirection: "column", 
        alignItems: "center", 
    }, 
    label: {
        marginTop: 10
    }, 
    qrContainer: {
        marginTop: 10, 
        alignItems: "center", 
        justifyContent: "center", 
    }, 
    qr: {
        flex: 1
    }, 
});

module.exports = SecretShare;
