import { createStackNavigator } from "react-navigation-stack";

import { Dashboard, UserCamera, FormatUsd } from "../../scence/index";
import Tabs from '../Tabs'

const AppNavigatorConfig = {
    initialRouteName: "dashboard",
    headerMode: "none"
}

const RouteConfigs = {
    dashboard : Dashboard,
    userCamera: UserCamera,
    formatUsd: FormatUsd
}

export default createStackNavigator(RouteConfigs, AppNavigatorConfig);