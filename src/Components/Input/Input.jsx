import React, {useState} from 'react';

function Input({ index }) {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    if (checked) {
      setChecked(false);
    }else{
      setChecked(true);
    }
  };

  return (
    <>
      <input 
          type="checkbox" 
          checked={checked} 
          onChange={()=>{handleCheck()}}
          id={index}
      />
    </>
  )
}

export default Input;