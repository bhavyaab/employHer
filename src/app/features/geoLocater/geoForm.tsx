import React, {useState} from "react";
import { useAppDispatch } from '../../../store/hooks';
import { getTimeAction } from "../../../store/geoLocationSlice";
export const GeoForm = (props:any) => {
    const [form, setForm] = useState({
        lattitude: props.lattitude,
        longitude: props.longitude,
        disableSubmit : true        
    });
    const [formFields, setFormFields] = useState({...props.formFields});
    const dispatch = useAppDispatch();
    const handleFormChange = (event:any) => {
        const { name, value } = event.target;
        var validEntry = formFields.fields[name]['validInput']? validateInput(name, value):true;
        const updatedForm = {
        ...form,
        [name]: value
      };
      updatedForm.disableSubmit = (updatedForm.lattitude === 0 || updatedForm.longitude === 0 || !validEntry);
      setForm(updatedForm);
  };
//validate each input field if it has valid input lattitude and longitude
  const validateInput = (name: string, value: number) => {
    var updateFormFields = {...formFields };
    var validEntry = updateFormFields.fields[name].validInput(value);

    if(formFields.fields[name]['validInput']) updateFormFields.fields[name]['errorMessage'] = validEntry? '':'Invalid ' + name + ' entry!';
  
    setFormFields(updateFormFields);
    return validEntry;
  }
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
      let {lattitude, longitude} = form;
      dispatch(getTimeAction({lattitude, longitude}));
      return false;
   }
   
    var inputFields:any[] = [];
    for(var prop in formFields.fields){
      var ele = formFields.fields[prop];
        inputFields.push(
          <div key={ele.name} className="formInput">
            <input
              name={ele.name}
              type={ele.type}
              step={ele.step}
              placeholder={ele.placeholder}
              onChange={(e) => handleFormChange(e)}
              onKeyDown={(e) => formatInput(e)}
            />
            <div
              className={ele.errorMessage ? "errorMessage message" : "message"}
            >
              {ele.errorMessage ? ele.errorMessage : ele.inputProperty}
            </div>
          </div>
        );
    }
    
    return  (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            {inputFields}
          </div>
            <button type="submit" disabled={form.disableSubmit}>Get Time</button>
        </form>
    )
}
