/*
USAGE:
      <FormItem
        name="password"
        placeholder="Password"
        handleChange={handleChange}
      />

      use displayName prop to display a different name
      incase the name is different from the displayName e.g. "Price (€)"

*/

type FormItemProps = {
  name: string;
  displayName?: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<any>) => void;
};

const FormItem = ({
  name,
  displayName,
  placeholder,
  handleChange,
}: FormItemProps) => {
  let type;
  if (name === "email") {
    type = "email";
  } else if (name === "password" || name === "confirmPassword") {
    type = "password";
  } else {
    type = "text";
  }
  return (
    <div className="mx-2 my-2">
      <label
        htmlFor={name}
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      >
        {displayName ? displayName : name}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        className="mt-1 block w-full border
       border-gray-300 rounded-md shadow-sm py-2 
       px-3 leading-tight focus:outline-none focus:ring-blue-500
        focus:border-blue-500"
      ></input>
    </div>
  );
};

export default FormItem;
