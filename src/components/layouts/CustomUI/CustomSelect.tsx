import { Field, FieldProps } from "formik";
import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

interface CustomSelectProps {
  name: string;
  options: { label: string; id: string }[];
  width: number;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  options,
  width,
}) => {
  const styles = {
    width: `${width}px`,
    marginTop: 16,
  };

  return (
    <Field name={name} >
      {({ field }: FieldProps) => (
        <FormControl style={styles}>
          <InputLabel>Payment</InputLabel>
          <Select {...field}>
            <MenuItem value="">Please select</MenuItem>
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Field>
  );
};
