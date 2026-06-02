import { ReactNode } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { InputLabel, Select, MenuItem, FormControl, FormHelperText, SelectProps } from '@mui/material';

interface IControlledSelectOption {
  label: string;
  value: string | number;
}

interface IControlledSelectProps extends UseControllerProps<any>, Omit<SelectProps, 'defaultValue' | 'name'> {
  label: ReactNode;
  options: IControlledSelectOption[];
  helperText?: string;
  disabledErrorOnValue?: boolean;
}

export function ControlledSelect({
  label,
  options,
  helperText,
  size = 'small',
  disabledErrorOnValue = false,
  ...props
}: IControlledSelectProps) {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  const showError = !disabledErrorOnValue ? !!error : !!error && !field.value;

  return (
    <FormControl fullWidth size={size} error={showError}>
      <InputLabel id={`${field.name}-label`} sx={{ color: 'text.disabled' }}>
        {label}
      </InputLabel>

      <Select {...props} {...field} labelId={`${field.name}-label`} id={`${field.name}-select`} value={field.value}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText>{helperText ?? (showError ? error?.message : undefined)}</FormHelperText>
    </FormControl>
  );
}
