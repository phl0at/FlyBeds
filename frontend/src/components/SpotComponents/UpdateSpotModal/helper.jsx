export const textInput = (value, placeholder, setter) => {
  return (
    <>
      <input
        type="text"
        value={value}
        name={placeholder}
        placeholder={placeholder}
        onChange={(e) => {
          setter(e.target.value);
        }}
      />
    </>
  );
};
