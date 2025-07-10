import React from "react";

const FloatingInput = ({ label, type, value, onChange, ...props }) => {
  return (
    <div className="relative w-full pt-6">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
        className="peer w-full bg-black/20 text-white placeholder-transparent py-3 px-4 rounded-lg border border-red-600/30 focus:outline-none focus:ring-2 focus:ring-red-500"
        {...props}
        required
      />
      <label
        className="absolute left-4 top-1 text-red-200 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-red-300 peer-focus:top-1 peer-focus:text-sm peer-focus:text-yellow-400"
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;
