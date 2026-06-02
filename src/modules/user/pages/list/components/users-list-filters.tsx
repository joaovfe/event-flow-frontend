import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid2';
import {
  ControlledEnum,
  ControlledDebounce,
  ControlledRole,
} from '@/shared/components';

import { EStatus, EStatusTranslate } from '@/shared/domain';

import { Role } from '@/modules/role/domain';
import { useUserList } from '@/modules/user/contexts';
import { UserListFiltersDTO } from '@/modules/user/domain';

export function UserListFilters() {
  const { onChangeFilter } = useUserList();
  const { control, watch } = useForm<UserListFiltersDTO & { role: Role }>();

  const search = watch('search');
  const status = watch('status');
  const role = watch('role');

  useEffect(() => {
    onChangeFilter({
      search: search,
      status: status,
      roleId: role?.id,
    });
  }, [role, search, status]);

  return (
    <Grid container width="100%" spacing={2}>
      <Grid size={{ sm: 6, xs: 12 }}>
        <ControlledDebounce label="Procurar" name="search" control={control} />
      </Grid>

      <Grid size={{ sm: 3, xs: 6 }}>
        <ControlledRole label="Perfil" name="role" control={control} />
      </Grid>

      <Grid size={{ sm: 3, xs: 6 }}>
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
