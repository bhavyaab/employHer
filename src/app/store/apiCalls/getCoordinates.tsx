export async function getCoordinates(){
    var response  = {lat : 0, long : 0, timeStamp: 0}
    navigator.geolocation.getCurrentPosition(function(position) {
      response.lat = position.coords.latitude
      response.long = position.coords.longitude
      response.timeStamp = position.timestamp
    });
    return response;
  }