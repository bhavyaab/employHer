export const geoFormFileds = {
    fields : {
    latitude: {
        type:"number",
        name:"latitude",
        value: '',
        placeholder:"Enter latitude",
        errorMessage: '',
        validInput: validlatitude
    },
    longitude: {
        type:"number",
        name:"longitude",
        value: '',
        placeholder:"Enter Longitude",
        errorMessage:'',
        validInput: validLongitude
    }
},
    disableSubmit : true
}


//returns true if value entered value is a valid latitude
//latitude value lies between -90 to +90;
export function validlatitude(value: number){    
    return (value < 90 && value > -90)
}

//returns true if value entered value is a valid longitude
//latitude value lies between -180 to +80;
export function validLongitude(value: number){    
    return (value < 80 && value > -180);
}