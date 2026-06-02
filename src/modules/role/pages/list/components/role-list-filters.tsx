import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Grid2 as Grid } from '@mui/material';

import { ControlledEnum, ControlledDebounce } from '@/shared/components';
import { EStatus, EStatusTranslate } from '@/shared/domain';
import { ERoleReference, ERoleReferenceTranslate } from '@/modules/role/domain';

import { useRoleList } from '@/modules/role/contexts';
import { RoleListFilterDTO } from '@/modules/role/domain/dtos';

export function RoleListFilters() {
  const { onChangeFilter } = useRoleList();
  const { control, watch } = useForm<RoleListFilterDTO>();

  const search = watch('search');
  const status = watch('status');
  const reference = watch('reference');

  useEffect(() => {
    onChangeFilter({
      search: search,
      status: status,
      reference: reference,
    });
  }, [reference, search, status]);

  return (
    <Grid container spacing={2} width="100%">
      <Grid size={{ md: 6, sm: 12, xs: 12 }}>
        <ControlledDebounce label="Procurar" name="search" control={control} />
      </Grid>

      <Grid size={{ md: 3, sm: 6, xs: 6 }}>
        <ControlledEnum
          label="Perfil de Usuário"
          name="reference"
          options={ERoleReference}
          translate={ERoleReferenceTranslate}
          control={control}
        />
      </Grid>

      <Grid size={{ md: 3, sm: 6, xs: 6 }}>
        <ControlledEnum
          label="Status"
          name="status"
          options={EStatus}
          translate={EStatusTranslate}
          control={control}
        />
      </Grid>
    </Grid>
  );
}
