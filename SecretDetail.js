'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    Component,
    Navigator,
    StyleSheet,
    Text,
    View,
    ListView, 
    TouchableHighlight, 
    Alert, 
} = ReactNative;

const _ = require("lodash");
const Realm = require("realm");
const Icon = require("react-native-vector-icons/FontAwesome");
const KeyPocket = require("./KeyPocket.js");

const SecretDetail = React.createClass({
    getInitialState() { 
        let shares = this.props.realm.
            objects("SecretShare").
            filtered("secretSharing = '" + this.props.secretSharing.uuid + "'");
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
        return { 
            sharesDataSource: dataSource.cloneWithRows(shares), 
        }; 
    },
    unlock() {
        if (KeyPocket.isRecoverable(this.props.realm, this.props.secretSharing)) {
            this.props.navigator.push({
                index: 1, 
                name: "SecretOpen", 
                title: this.props.secretSharing.name, 
                sceneConfig: Navigator.SceneConfigs.FloatFromBottom, 
                passProps: {
                    realm: this.props.realm,
                    secretSharing: this.props.secretSharing, 
                }
            });
        } else {
            Alert.alert(
                "Secret Not Recoverable", 
                "You must collect at least " + 
                    this.props.secretSharing.threshold + 
                    " shares to recover this secret. ");
        }
    }, 
    showSecretShareScreen(share) {
        var x = KeyPocket.createAttributableSecretShare(this.props.secretSharing, share);
        var name = share.name || "Unknown Share";
        this.props.navigator.push({
            index: 1, 
            name: "SecretShare", 
            title: name, 
            sceneConfig: Navigator.SceneConfigs.FloatFromRight, 
            passProps: {attributableSecretShare: x}
        });
    }, 
    renderRow(rowData) {
        var name = rowData.name || "?";
        return (
            <View style={styles.row}>
                <TouchableHighlight 
                    style={styles.rowButton} 
                    underlayColor="#eee"
                    onPress={() => this.showSecretShareScreen(rowData)}>
                    <View style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                        <Text style={styles.rowButtonText}>{name}</Text>
                        <Icon name="chevron-right" />
                    </View>
                </TouchableHighlight>
            </View>
        );
    }, 
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.info}>
                  Store each share on a different device to protect your secret. 
                </Text>
                <Text style={styles.info}>
                  You will need to collect {this.props.secretSharing.threshold} shares to recover the secret. 
                </Text>
                <ListView style={styles.list}
                    dataSource={this.state.sharesDataSource}
                    renderRow={this.renderRow} />
                <TouchableHighlight 
                    style={styles.button} 
                    onPress={() => this.unlock()}
                    underlayColor="#01ddb1">
                    <Text style={styles.buttonText}>Unlock</Text>
                </TouchableHighlight>
            </View>
        );
    }, 
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    label: {
        marginTop: 10, 
        alignSelf: "flex-start", 
    }, 
    info: { 
        margin: 10, 
    }, 
    progressBar: {
        marginTop: 10, 
        height: 16, 
        borderRadius: 8, 
        alignSelf: "stretch", 
        backgroundColor: "#ccc", 
    }, 
    progressBarFill: {
        flex: 1, 
        backgroundColor: "#00dcb0", 
    }, 
    progressBarBackground: { 
        backgroundColor: "#ccc", 
    }, 
    list: {
        marginTop: 10,
        flex: 1,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: "#eee", 
        borderBottomWidth: 1, 
    },
    rowButton: {
        flex: 1,
        flexDirection: 'row',
        padding: 24, 
    },
    rowButtonText: {
        fontSize: 18, 
    }, 
    shareButton: {
        fontSize: 12, 
    }, 
    check: { 
        color: "#00dcb0", 
        fontSize: 12, 
        marginRight: 10, 
    }, 
    pending: { 
        color: "#d5b044", 
        fontSize: 12, 
        marginRight: 10, 
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

module.exports = SecretDetail;
