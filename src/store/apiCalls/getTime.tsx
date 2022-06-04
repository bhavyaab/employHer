var key = process.env.REACT_APP_TIMEZONE_API_KEY;

export async function getTimeZone(lattitude:number, longitude:number){
    const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${key}&format=json&by=position&lat=${lattitude}&lng=${longitude}`;
    
    var response = await fetch(url).then((resp) => resp.json());

    response = {
      longitude,
      lattitude,
      status: response.status,
      city: response.cityName,
      message: response.message,
      country: response.countryName,
      currentTime: convertDateAndTime(response.formatted),
    };
    return new Promise(function (resolve, reject) {
      return (response.status === 'OK')? resolve(response) : reject(response); 
  });
  }

  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  export function convertDateAndTime(timestamp : string){
    if(!timestamp) return {date: '', time: '00:00:00'};
    var time = timestamp.split(' ');
    var date = time[0].split('-');
    time = time[1].split(':');
    var hours = parseInt(time[0])
    var minutes = time[1];
    var ampm = 'AM';
    var currHours = hours.toString()
    if(hours > 12){
      hours = hours - 12;
      ampm = 'PM';
      currHours = (hours < 10? '0' : '') + hours.toString();
      if(hours === 12) {
        currHours = '00'
        ampm = 'AM'
      }
    } else if(hours < 12){
      currHours = (hours < 10? '0' : '') + hours.toString();
      ampm = 'AM';
      if(hours === 12) ampm = 'PM';
    }
    return {
              date: months[parseInt(date[2])] +" / "+ date[1] +" / "+date[0],
              time: `${currHours} : ${minutes} : ${time[2]} ${ampm}`
          };
  }
