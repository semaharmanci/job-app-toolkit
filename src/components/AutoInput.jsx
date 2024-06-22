import React from "react";
import { useSelector } from "react-redux";

const AutoInput = ({ label, name }) => {
  const { jobs } = useSelector((store) => store);

  const arr = jobs.map((job) => job[name]); //sadece posizyon aldik
  const filtredSet = new Set(arr); //dizideki tekrar eden elemanlari kaldirdik
  const options = Array.from(filtredSet); //diziye cevirdik
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input type="text" id={label} name={name} required />

      <datalist id={name}>
        {options.map((i,index) => (
          <option key={index} value={i} />
        ))}
      </datalist>
    </div>
  );
};

export default AutoInput;
