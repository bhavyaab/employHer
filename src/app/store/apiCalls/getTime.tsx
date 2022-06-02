export async function getTimeNow(){
    // const url = 'https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production?moves='
    // var dataAddedUrl = url + JSON.stringify([]);

    // const response = await fetch(dataAddedUrl).then(res => res.json());
    // return response;
  }

  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  export function convertDateAndTime(timeStamp : number){
    var date = new Date(timeStamp);
    return {
              date: months[date.getMonth()] +" / "+ date.getDate() +" / "+date.getFullYear(),
              time: date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
          };
  }
