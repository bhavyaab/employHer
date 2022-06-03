import React, {useState} from "react";

export const GeoForm = (props:any) => {
    const [form, setForm] = useState({
        lattitude: props.lattitude,
        longitude: props.longitude
    });
    const [formFields, setFormFields] = useState({...props.formFields});
    const handleFormChange = (event:any) => {
        const { name, value } = event.target;
        const updatedForm = {
        ...form,
        [name]: value
      };
    var validEntry = true
      if(formFields.fields[name]['validInput']){
        console.log(formFields)
        var updateFormFields = {
          ...formFields
        };
        validEntry = updateFormFields.fields[name].validInput(value);
        updateFormFields.fields[name]['errorMessage'] = validEntry? '':'Invalid ' + name + ' entry!';
        setFormFields(updateFormFields);
      }
      console.log(validEntry);
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
   
    var inputFields:any[] = [];
    for(var prop in formFields.fields){
      var ele = formFields.fields[prop];
        inputFields.push((<div key={ele.name} className="FormInput">
                            <input
                              name={ele.name}
                              type={ele.type}
                              placeholder={ele.placeholder}
                              onChange={(e) => handleFormChange(e)}
                              onKeyDown={e => formatInput(e)}
                              />
                            <label>{ele.errorMessage}</label>
                        </div>))
    }
    
    return  (
        <form>
            {inputFields}
            <button onSubmit={(e) => handleSubmit(e)} disabled={formFields.disableSubmit}>'Get Time'</button>
        </form>
    )
}