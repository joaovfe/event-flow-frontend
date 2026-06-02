import { DatePicker, DatePickerProps, LocalizationProvider } from '@mui/x-date-pickers';
import { useController, UseControllerProps } from 'react-hook-form';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from 'luxon';

interface IControlledDateProps extends UseControllerProps<any>, Omit<DatePickerProps<any>, 'defaultValue' | 'name'> {}

export function ControlledDate({ format = 'dd/MM/yyyy', ...props }: IControlledDateProps) {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  const pickerValue: DateTime | null = (() => {
    const value = field.value as unknown;
    if (!value) return null;
    if (value instanceof DateTime) return value as DateTime;
    if (typeof value === 'string') return DateTime.fromISO(value as string);
    if (value instanceof Date) return DateTime.fromJSDate(value as Date);
    return null;
  })();

  const handleChange = (next: DateTime | null, context: unknown) => {
    const nextValue = next && next.isValid ? next.toJSDate() : undefined;
    field.onChange(nextValue);
    if (typeof props.onChange === 'function') props.onChange(next as any, context as any);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
        {...props}
        value={pickerValue}
        onChange={handleChange}
        format={format}
        slotProps={{
          textField: {
            size: 'small',
            fullWidth: true,
            error: !!error,
            helperText: error?.message,
            name: field.name,
            inputRef: field.ref,
            onBlur: field.onBlur,
          },
          field: { clearable: true },
        }}
      />
    </LocalizationProvider>
  );
}
