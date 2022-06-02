import React, {useState} from "react";
import { geoFormFileds} from './geoFormFields';
import  { FormInput } from '../../component/formInput';

export const GeoForm = () => {
    const [form, setForm] = useState({
        latitude: 0,
        longitude: 0,
    });
    const handleFormChange = (event:any) => {
        // Get the name of the field that caused this change event
        // Get the new value of this field
        const { name, value } = event.target;
    
    // Assign new value to the appropriate form field
    const updatedForm = {
      ...form,
      [name]: value
    };
    
    // Update state
    setForm(updatedForm);
  };
//number input type allows 'e'  as input remove by formating input
  const formatInput = (e:any) => {
     // Prevent characters that are not numbers ("e")
     let checkIfNum;
     if (e.key !== undefined) {
       // Check if it's a "e"
       checkIfNum = e.key === "e";
     } else if (e.keyCode !== undefined) {
       // Check if it's a "e" (69)
       checkIfNum = e.keyCode === 69;
     }
     return checkIfNum && e.preventDefault();
   }

   const handleSubmit = (event : any) => {
      event.preventDefault();
      console.log(event)
   }
    var inputFields = geoFormFileds.fields.map((ele:any) => <FormInput key={ele.name} {...ele} onChange={handleFormChange} onKeyDown={formatInput}></FormInput>)
    return  (
        <form>
            {inputFields}
            
        </form>
    )
}