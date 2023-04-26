import classes from "./CustomInput.module.css";

const CustomInput = (props) => {
  const { value, typeInput, nameInput, labelInput, onReturnValue } = props;

  const onObtainInputValue = (event) => {
    onReturnValue(event.target.value, nameInput);
  };

  return (
    <div className={classes.formGroup}>
      <label form={nameInput}>{labelInput}</label>
      <input
        type={typeInput}
        name={nameInput}
        value={value}
        onChange={onObtainInputValue}
        className={classes.formField}
      />
    </div>
  );
};

export default CustomInput;
