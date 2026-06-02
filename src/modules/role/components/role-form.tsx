import { useFormContext } from 'react-hook-form';
import { Grid2 as Grid } from '@mui/material';

import { ControlledEnum, ControlledText } from '@/shared/components/fields';
import { EStatus, EStatusTranslate } from '@/shared/domain';

import {
  RoleCreateData,
  ERoleReference,
  ERoleReferenceTranslate,
  RoleUpdateData,
} from '../domain';

type RoleFormProps = {
  disabled?: boolean;
};

export function RoleForm({ disabled }: RoleFormProps) {
  const { control } = useFormContext<RoleCreateData | RoleUpdateData>();

  return (
    <Grid container spacing={2} width="100%">
      <Grid size={{ md: 3, sm: 6, xs: 6 }}>
        <ControlledEnum
          label="Tipo"
          name="reference"
          options={ERoleReference}
          translate={ERoleReferenceTranslate}
          control={control}
          disabled={disabled}
        />
      </Grid>

      <Grid size={{ md: 3, sm: 6, xs: 6 }}>
        <ControlledEnum
          label="Status"
          name="status"
          options={EStatus}
          translate={EStatusTranslate}
          control={control}
          disabled={disabled}
        />
      </Grid>

      <Grid size={{ md: 6, sm: 12, xs: 12 }}>
        <ControlledText
          label="Nome"
          name="name"
          control={control}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
}
