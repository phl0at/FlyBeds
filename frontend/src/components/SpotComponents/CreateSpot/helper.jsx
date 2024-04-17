
export const textInput = (value, placeholder, setter, spot) => {
  if(!value) return <>{"Loading...."}</>
  return (
    <>
      <input
        type="text"
        value={value ? value : spot[placeholder.toLowerCase()]}
        name={placeholder}
        placeholder={placeholder}
        onChange={(e) => {
          setter(e.target.value);
        }}
      />
    </>
  );
};
