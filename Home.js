'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    Image,
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
} = ReactNative;

const KeyPocket = require("./KeyPocket.js");
const Icon = require("react-native-vector-icons/FontAwesome");
const Uuid = require("uuid");
const Realm = require("realm");
const Nav = require("./Nav.js");

import { ListView } from 'realm/react-native';

const Home = React.createClass({
    showSecretDetail(secretSharing) {
        this.props.navigator.push({
            index: 1, 
            name: 'SecretDetail', 
            title: secretSharing.name, 
            passProps: {
                realm: this.props.realm, 
                secretSharing: secretSharing, 
            }, 
        });
    }, 
    getInitialState() {
        let secretSharings = this.props.realm.objects("SecretSharing");;
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
        return { 
            dataSource: dataSource.cloneWithRows(secretSharings), 
        }; 
    }, 
    componentWillMount() {
        this.props.realm.addListener("change", () => {
            let secretSharings = this.props.realm.objects("SecretSharing");
            let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
            this.setState({ 
                dataSource: dataSource.cloneWithRows(secretSharings), 
            }); 
        });
        Nav.showWelcome(this.props.route, this.props.navigator);
    }, 
    componentWillUnmount() {
        this.props.realm.removeAllListeners();
    }, 
    renderRow(rowData) {
        return (
            <View style={styles.row}>
                <TouchableHighlight 
                    style={styles.rowButton}
                    underlayColor="#eee"
                    onPress={() => this.showSecretDetail(rowData)}>
                    <View style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                        <Text style={styles.rowButtonText}>{rowData.name}</Text>
                        <Icon name="chevron-right" />
                    </View>
                </TouchableHighlight>
            </View>
        );
    }, 
    render() {
        return (
            <View style={styles.container}>
                <ListView 
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow} />
           </View>);
    }, 
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    label: {
        marginTop: 10, 
    }, 
    list: {
        alignSelf: 'stretch', 
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
    create: {
        color: "#fff", 
        fontSize: 20, 
    }, 
    recoverable: { 
        color: "#2651a6", 
        marginRight: 10, 
    }, 
    protected: { 
        color: "#00dcb0", 
        marginRight: 10, 
        fontSize: 12, 
    }, 
    unprotected: { 
        color: "#d5b044", 
        marginRight: 10, 
        fontSize: 12, 
    }, 
    lost: { 
        color: "#f22727", 
        marginRight: 10, 
        fontSize: 12, 
    }, 
    loader: {
        margin: 10, 
        alignSelf: "center", 
    }
});

module.exports = Home;
