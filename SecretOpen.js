import React, {
    StyleSheet, 
    View, 
    Text, 
} from "react-native";

const KeyPocket = require("./KeyPocket.js");

const SecretOpen = React.createClass({
    render() {
        let shares = this.props.realm.
            objects("SecretShare").
            filtered("secretSharing = '" + this.props.secretSharing.uuid + "'");
        let text = this.props.secretSharing.secret || 
            KeyPocket.recover(shares);
        console.log(text);
        return (
            <View style={styles.container}>
                <Text style={styles.info}>{text}</Text>
            </View>);
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    info: {
        margin: 10, 
    }
});

module.exports = SecretOpen;
