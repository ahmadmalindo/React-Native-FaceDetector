import PushNotification from "react-native-push-notification";

PushNotification.configure({
    onNotification: function(notification) {
        console.log("Local Notification", notification)
    },
    popInitialNotification: true,
    requestPermissions: true
})

PushNotification.createChannel({
    channelId:"channel-id",
    channelName: "my channel",
    channelDescription: "channel channel okok",
    playSound: true,
    soundName: 'default',
    importance: 10,
    vibrate: true,
    vibration: 1000,
},
(created) => console.log(created)
)

export const LocalNotification = () => {
    PushNotification.localNotification({
        channelId:"channel-id",
        channelName: "my channel",
        autoCancel: true,
        bigText: 'Yey Kamu Berhasil Jual',
        subText: 'gambarmu berhasil dijual',
        title: 'Yey Kamu Berhasil Jual',
        message: 'selengkapnya',
        channelDescription: "yeay",
        playSound: true,
        soundName: 'default',
        importance: 10,
        vibrate: true,
    })
}