import { TextField, TextFieldProps } from '@mui/material';
import { ChangeEventHandler } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

interface IControlledNumberProps
  extends UseControllerProps<any>,
    Omit<TextFieldProps, 'defaultValue' | 'name'> {
  step?: number;
  min?: number;
  max?: number;
}

export function ControlledNumber({
  fullWidth = true,
  size = 'small',
  step = 1,
  min,
  max,
  ...props
}: IControlledNumberProps) {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const input = event.target as HTMLInputElement;
    const numericValue = Number.isNaN(input.valueAsNumber)
      ? undefined
      : input.valueAsNumber;
    field.onChange(numericValue);
    if (typeof props.onChange === 'function') props.onChange(event);
  };

  return (
    <TextField
      {...props}
      {...field}
      size={size}
      value={field.value ?? ''}
      onChange={handleChange}
      fullWidth={fullWidth}
      error={props.error ?? !!error}
      helperText={props.helperText ?? error?.message}
      slotProps={{
        ...props.slotProps,
        htmlInput: {
          ...props.slotProps?.htmlInput,
          type: 'number',
          step,
          min,
          max,
        },
      }}
    />
  );
}
