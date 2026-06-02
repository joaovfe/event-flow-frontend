import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import { TextField, TextFieldProps } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';

interface IControlledTextProps extends UseControllerProps<any>, Omit<TextFieldProps, 'defaultValue' | 'name'> {
  mask?: string;
  maxLength?: number;
  disabledErrorOnValue?: boolean;
}

const TextMask = forwardRef<HTMLInputElement, any>(function TextMask(props, ref) {
  const { onChange, readOnly, mask, ...other } = props;
  return (
    <IMaskInput {...other} mask={mask} unmask={true} onAccept={(value, _mask) => onChange(value)} inputRef={ref} />
  );
});

export function ControlledText({ fullWidth = true, size = 'small', mask, maxLength, ...props }: IControlledTextProps) {
  const { disabled, ...controllerProps } = props;
  const {
    field,
    fieldState: { error },
  } = useController(controllerProps);

  const { ref, ...fieldRest } = field;

  return (
    <TextField
      {...props}
      {...fieldRest}
      inputRef={ref}
      disabled={disabled}
      size={size}
      fullWidth={fullWidth}
      minRows={props.minRows ?? 4}
      value={fieldRest.value ?? ''}
      error={
        props.error ??
        (!props.disabledErrorOnValue ? !!error : !!error && !fieldRest.value)
      }
      helperText={
        props.helperText ??
        (!props.disabledErrorOnValue
          ? !!error && !fieldRest.value
            ? error?.message
            : undefined
          : undefined)
      }
      slotProps={{
        ...props.slotProps,
        input: {
          ...props.slotProps?.input,
          inputComponent: mask ? TextMask : undefined,
          inputProps: { mask },
        },
      }}
    />
  );
}
