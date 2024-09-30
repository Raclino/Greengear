import * as Notifications from 'expo-notifications';

// export async function registerForPushNotificationsAsync() {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//         alert('Failed to get push token for push notification!');
//         return;
//     }

//     const token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);

//     // Here, you can also send the token to your server to keep it 
//     // for sending push notifications from there.
// }
