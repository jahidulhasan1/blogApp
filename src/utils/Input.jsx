import React from "react";

function Input({ type, name, title, form, setForm, autocomplete = "" }) {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-2 ">
      <label className=" text-md capitalize">{title}</label>
      <input
        onChange={handleChange}
        className="text-center border-b border-black outline-none"
        type={type}
        name={name}
        autoComplete={autocomplete}
      />
    </div>
  );
}

export default Input;
