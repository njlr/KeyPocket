'use strict';

const Uuid = require("uuid");
const Secrets = require("./secrets-react-native.js"); 
const _ = require("lodash");

import React, { AsyncStorage } from 'react-native';

const nato = [
    "Alpha", 
    "Bravo", 
    "Charlie", 
    "Delta", 
    "Echo", 
    "Foxtrot", 
    "Golf", 
    "Hotel", 
    "India", 
    "Juliett", 
    "Kilo", 
    "Lima", 
    "Mike", 
    "November", 
    "Oscar", 
    "Papa", 
    "Quebec", 
    "Romeo", 
    "Sierra", 
    "Tango", 
    "Uniform", 
    "Victor", 
    "Whiskey", 
    "X-ray", 
    "Yankee", 
    "Zulu"];

function generateNames(n) {
    if (!_.isInteger(n) || n < 0) {
        throw new Error("The parameter 'n' must be a non-negative integer. ");
    }
    if (n >= nato.length) {
        throw new Error("Unsupported");
    }
    return nato.slice(n);
}

function generateNameForIndex(index) {
    if (!_.isInteger(index) || index < 0) {
        throw new Error("The parameter 'index' must be a non-negative integer. ");
    }
    if (index >= nato.length) {
        throw new Error("Unsupported");
    }
    return nato[index];
}

class SecretShare { }

SecretShare.schema = {
    name: "SecretShare", 
    primaryKey: "uuid", 
    properties: {
        uuid: "string", 
        name: "string", 
        content: "string", 
        secretSharing: "string", 
    }
}

function createSecretShare(name, content, secretSharing) {
    if (!_.isString(name)) {
        throw new Error("The parameter 'name' must be a string. ");
    }
    if (!_.isString(content)) {
        throw new Error("The parameter 'content' must be a string. ");
    }
    if (!_.isString(secretSharing)) {
        throw new Error("The parameter 'secretSharing' must be a string. ");
    }
    return {
        uuid: Uuid.v4(), 
        name: name, 
        content: content, 
        secretSharing: secretSharing, 
    };
}

class SecretSharing { }

SecretSharing.schema = {
    name: "SecretSharing", 
    primaryKey: "uuid", 
    properties: {
        uuid: "string", 
        name: "string", 
        numberOfShares: "int", 
        threshold: "int", 
        secret: {type: "string", optional: true}, 
    },
};

function createSecretSharing(name, secret, numberOfShares, threshold) {
    if (!_.isString(name)) {
        throw new Error("The parameter 'name' must be a string. ");
    }
    if (!_.isString(secret)) {
        throw new Error("The parameter 'secret' must be a string. ");
    }
    if (!_.isInteger(numberOfShares)) {
        throw new Error("The parameter 'numberOfShares' must be an int. ");
    }
    if (!_.isInteger(threshold)) {
        throw new Error("The parameter 'threshold' must be a string. ");
    }
    return {
        uuid: Uuid.v4(), 
        name: name, 
        secret: secret, 
        numberOfShares: numberOfShares, 
        threshold: threshold, 
    };
}

class AttributableSecretShare { }

AttributableSecretShare.schema = {
    name: "AttributableSecretShare", 
    primaryKey: "uuid", 
    properties: {
        uuid: "string", 
        name: "string", 
        content: "string", 
        secretUuid: "string", 
        secretName: "string", 
        secretNumberOfShares: "int", 
        secretThreshold: "int", 
    }
}

function generateShares(secretSharing) {
    let shares = Secrets.share(
        Secrets.str2hex(secretSharing.secret), 
        secretSharing.numberOfShares, 
        secretSharing.threshold).map((x, i) => {
            return createSecretShare(
                generateNameForIndex(i), 
                x, 
                secretSharing.uuid);
        });
    return shares;
}

function createAttributableSecretShare(secretSharing, secretShare) {
    return {
        uuid: secretShare.uuid, 
        content: secretShare.content, 
        name: secretShare.name, 
        secretUuid: secretSharing.uuid, 
        secretName: secretSharing.name, 
        secretNumberOfShares: secretSharing.numberOfShares, 
        secretThreshold: secretSharing.threshold, 
    };
}

const secretSharingsKey = "secretSharings";

function getSecretSharings(callback, errorCallback) {
    AsyncStorage.getItem(secretSharingsKey, (err, result) => {
        if (err) {
            return errorCallback(err);
        }
        if (!result || result == "" || result == null) {
            result = "[]";
        }
        callback(JSON.parse(result));
    });
}

function saveAttributableSecretShare(realm, attributableSecretShare) {
    realm.write(() => {
        let secretShare = {
            uuid: attributableSecretShare.uuid, 
            name: attributableSecretShare.name, 
            content: attributableSecretShare.content, 
            secretSharing: attributableSecretShare.secretUuid, 
        };
        let matchingSecretShare = realm.
            objects("SecretShare").
            filtered("uuid = '" + attributableSecretShare.uuid + "'");
        if (matchingSecretShare.length === 0) {
            realm.create("SecretShare", secretShare);
        }
        let matchingSecretSharings = realm.
            objects("SecretSharing").
            filtered("uuid = '" + attributableSecretShare.secretUuid + "'");
        if (matchingSecretSharings.length === 0) {
            let secretSharing = {
                uuid: attributableSecretShare.secretUuid, 
                name: attributableSecretShare.secretName, 
                secret: null, 
                numberOfShares: attributableSecretShare.secretNumberOfShares, 
                threshold: attributableSecretShare.secretThreshold, 
            };
            realm.create("SecretSharing", secretSharing);
        }
    });
}

function isAttributableSecretShare(x) {
    return x && 
        _.isString(x.uuid) && 
        _.isString(x.content) && 
        _.isString(x.name) && 
        _.isString(x.secretUuid) && 
        _.isString(x.secretName) && 
        _.isInteger(x.secretNumberOfShares) && 
        _.isInteger(x.secretThreshold);
}

function isRecoverable(realm, secretSharing) {
    if (secretSharing.secret) {
        return true;
    }
    let shares = realm.
        objects("SecretShare").
        filtered("secretSharing = '" + secretSharing.uuid + "'");
    return shares.length >= secretSharing.threshold;
}

function recover(shares) {
    return Secrets.hex2str(Secrets.combine(shares.map((x) => x.content)));
}

module.exports = { generateShares, generateNameForIndex, createSecretSharing, createAttributableSecretShare, 
    SecretShare, SecretSharing, isAttributableSecretShare, isRecoverable, recover, 
    AttributableSecretShare, saveAttributableSecretShare };
