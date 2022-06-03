export async function getCoordinates(){
    var response  = {lattitude : 0, longitude : 0, timestamp: 0}
    navigator.geolocation.getCurrentPosition(function(position) {
      response.lattitude = position.coords.latitude
      response.longitude = position.coords.longitude
      response.timestamp = position.timestamp
    });
    return response;
  }