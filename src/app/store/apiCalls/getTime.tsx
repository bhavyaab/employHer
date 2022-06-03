import { resolve } from "path";

var key = process.env.REACT_APP_TIMEZONE_API_KEY || 'DEQFCA85DPXD';

export async function getTimeZone(lattitude:number, longitude:number){
    const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${key}&format=json&by=position&lat=${lattitude}&lng=${longitude}`;
    var response = await fetch(url).then(resp => resp.json());
    console.log(response)
    return {
      timestamp: response.formatted,
      city: response.cityName,
      country: response.countryName,
      lattitude,
      longitude
    };
  }

  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  export function convertDateAndTime(timestamp : string){
    if(!timestamp) return {date: '', time: ''};
    var time = timestamp.split(' ');
    var date = time[0].split('-');
    var time = time[1].split(':');
    var hours = parseInt(time[0])
    var minutes = time[1];
    var ampm = 'AM';
    var currHours = ''
    console.log(hours)
    if(hours > 12){
      hours = hours - 12;
      ampm = 'PM';
      currHours = (hours < 10? '0' : '') + hours.toString();
      if(hours == 12) {
        currHours = '00'
        ampm = 'AM'
      }
    } else if(hours < 12){
      currHours = (hours < 10? '0' : '') + hours.toString();
      ampm = 'AM';
      if(hours == 12) ampm = 'PM';
    }
    return {
              date: months[parseInt(date[2])] +" / "+ date[1] +" / "+date[0],
              time: `${currHours} : ${minutes} : ${time[2]} ${ampm}`
          };
  }
