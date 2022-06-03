export const geoFormFileds = {
  fields: {
    lattitude: {
      type: "number",
      name: "lattitude",
      step: "any",
      placeholder: "Enter lattitude",
      errorMessage: "",
      inputProperty: "-90 to 90 is valid lattitude.",
      validInput: validlatitude,
    },
    longitude: {
      type: "number",
      name: "longitude",
      step: "any",
      placeholder: "Enter Longitude",
      errorMessage: "",
      inputProperty: "-180 to 80 is valid longitude.",
      validInput: validLongitude,
    },
  },
};


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