/**
 * @format
 */

import { Component } from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import codePush from "react-native-code-push";

// class JualFotomu extends Component {
//     render () {
        
//     }
// }

// let codePushOptions = { checkFrequency: 
//     codePush.CheckFrequency.ON_APP_RESUME, installMode:
//     codePush.InstallMode.ON_NEXT_RESUME
// }

// JualFotomu = codePush(codePushOptions) (JualFotomu);
// export default JualFotomu;

AppRegistry.registerComponent(appName, () => App);
