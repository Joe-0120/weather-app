function start() {
  const successCallback = (position) => {
    const lat = position.coords.latitude;
    const longit = position.coords.longitude;
    const url = "/location";
    const data = {
      latitude: lat,
      longitude: longit,
    };
    const jsonData = JSON.stringify(data);
    const headers = {
      "Content-Type": "application/json",
    };
    fetch(url, {
      method: "POST",
      headers: headers,
      body: jsonData,
    })
      .then((response) => {
        if (response.status == 200) {
          window.location.href = "/weather";
        } else {
          alert(response.message);
        }
      })
      .catch(function (res) {
        console.log(res);
      });
  };

  const errorCallback = (error) => {
    document.write(error);
  };

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}
