"use strict;"

const React = require('react');
const ReactNative = require('react-native');
const {
    Navigator,
} = ReactNative;

function showHomeScreen(route, navigator) {
    navigator.push({
        index: (route.index || 0) + 1, 
        name: "Create", 
        title: null, 
        sceneConfig: Navigator.SceneConfigs.FloatFromBottom, 
    });
}

function showWelcome(route, navigator) {
    navigator.push({
        index: (route.index || 0) + 1, 
        name: "Welcome", 
        title: "Hello", 
        sceneConfig: Navigator.SceneConfigs.FloatFromBottom, 
    });
}

function showCreateScreen(route, navigator, callback) {
    navigator.push({
        index: (route.index || 0) + 1, 
        name: "Create", 
        title: "Create Secret", 
        passProps: {callback: callback}, 
        sceneConfig: Navigator.SceneConfigs.FloatFromBottom, 
    });
}

function showRecoverScreen(route, navigator, callback) {
    navigator.push({
        index: (route.index || 0) + 1, 
        name: "Recover", 
        title: "Recover Secret", 
        passProps: {callback: callback}, 
        sceneConfig: Navigator.SceneConfigs.FloatFromBottom, 
    });
}

module.exports = { showHomeScreen, showWelcome, showCreateScreen, showRecoverScreen };
