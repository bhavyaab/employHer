export async function getCoordinates(){
    var response  = {lattitude : 0, longitude : 0, timeStamp: 0}
    navigator.geolocation.getCurrentPosition(function(position) {
      response.lattitude = position.coords.latitude
      response.longitude = position.coords.longitude
      response.timeStamp = position.timestamp
    });
    return response;
  }