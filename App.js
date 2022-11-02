import React, {useEffect} from 'react';
import RootNavigator from '@navigations';
import { NativeBaseProvider } from 'native-base';
import { Provider } from "react-redux";
import store from "@stores/store";
import 'moment/locale/id';
import RemotePushController from "./src/service/RemotePushController";
import codePush from "react-native-code-push";

console.disableYellowBox = true;

const App = () => {

  return (
    <NativeBaseProvider>
        <Provider store={store}>
            <RootNavigator>             
            </RootNavigator>
            <RemotePushController/>
        </Provider>
    </NativeBaseProvider>
  );
};

export default codePush(App);