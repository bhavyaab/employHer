export const geoFormFileds = {
    fields : {
    lattitude: {
        type:"number",
        name:"lattitude",
        value: '',
        placeholder:"Enter lattitude",
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
}
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