import React, {useEffect} from "react";
import PushNotification from "react-native-push-notification";

const RemotePushController = () => {
    useEffect(() => {
        PushNotification.configure({
            onRegister: function(token) {
                console.log("Token", token)
            },

            onNotification: function(notification) {
                console.log("NOTIF", notification)
            },

            senderID: '350399117886',
            popInitialNotification: true,
            requestPermissions: true,
        })
    }, [])
    return null
}

export default RemotePushController