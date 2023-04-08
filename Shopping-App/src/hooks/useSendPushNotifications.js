//This can be managed from the Backend, only get users device token during login/signup
export default async ({ pushToken = "", title = "", body = "" }) => {
  //Can also send push notifications to other devices
  return await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "Application/json",
      "Accept-Encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: pushToken,
      title,
      body,
    }),
  })
    .then((res) => console.log("response notif", res.json()))
    .catch((err) => console.log("error notif", err));
};
