import { useFormContext } from 'react-hook-form';
import { Grid2 as Grid } from '@mui/material';

import { ControlledText } from '@/shared/components';
import { ControlledDate } from '@/shared/components/fields';

import { EventFormData } from '../domain';

type EventFormProps = {
  disabled?: boolean;
};

export function EventForm({ disabled }: EventFormProps) {
  const { control } = useFormContext<EventFormData>();

  return (
    <Grid container width="100%" spacing={2} component="form">
      <Grid size={{ xs: 12 }}>
        <ControlledText
          label="Título*"
          name="title"
          size="small"
          control={control}
          disabled={disabled}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <ControlledText
          label="Local*"
          name="location"
          size="small"
          control={control}
          disabled={disabled}
        />
      </Grid>

      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledDate label="Início*" name="startDate" control={control} disabled={disabled} />
      </Grid>

      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledDate label="Fim*" name="endDate" control={control} disabled={disabled} />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <ControlledText
          label="URL da Imagem"
          name="image"
          size="small"
          control={control}
          disabled={disabled}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <ControlledText
          label="Descrição*"
          name="description"
          size="small"
          control={control}
          disabled={disabled}
          multiline
          minRows={4}
        />
      </Grid>
    </Grid>
  );
}
