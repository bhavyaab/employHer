export const geoFormFileds = {
    fields : [
        {
        type:"number",
        name:"latitude",
        value: '',
        placeholder:"Enter Latitude",
        errorMEssage: '',
        validInput: validLatitude
    },
    {
        type:"number",
        name:"longitude",
        value: '',
        placeholder:"Enter Longitude",
        errorMessage:'',
        validInput:validLongitude
    }
    ],
    disableSubmit : true
}


//returns true if value entered value is a valid latitude
//latitude value lies between -90 to +90;
function validLatitude(value: number){    
    if(value > 90 && value < -90) return false;
}

//returns true if value entered value is a valid longitude
//latitude value lies between -180 to +80;
function validLongitude(value: number){    
    if(value > 80 && value < -180) return false;
}