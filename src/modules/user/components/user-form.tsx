import { useFormContext } from 'react-hook-form';
import { Grid2 as Grid } from '@mui/material';

import {
  ControlledEnum,
  ControlledPassword,
  ControlledRole,
  ControlledSwitch,
  ControlledText,
} from '@/shared/components';
import { EStatus, EStatusTranslate } from '@/shared/domain';
import { UserCreateData, UserUpdateData } from '../domain';

type UserFormProps = {
  withoutPassword?: boolean;
  disabled?: boolean;
};

export function UserForm({ disabled, withoutPassword }: UserFormProps) {
  const { control } = useFormContext<UserCreateData | UserUpdateData>();

  return (
    <Grid container width="100%" spacing={2} component="form">
      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledText
          label="Nome*"
          name="name"
          size="small"
          control={control}
          disabled={disabled}
        />
      </Grid>

      <Grid size={{ md: 6, xs: 12 }}>
        <ControlledText
          label="E-mail*"
          name="email"
          size="small"
          control={control}
          disabled={disabled}
        />
      </Grid>

      <Grid size={{ md: 3, sm: 6, xs: 12 }}>
        <ControlledRole
          label="Perfil de Usuário*"
          name="role"
          control={control}
          disabled={disabled}
          disableClearable
        />
      </Grid>

      <Grid size={{ md: 3, sm: 6, xs: 12 }}>
        <ControlledEnum
          label="Status*"
          name="status"
          options={EStatus}
          translate={EStatusTranslate}
          control={control}
          disabled={disabled}
          disableClearable
        />
      </Grid>

      {!withoutPassword && (
        <Grid size={{ lg: 3, md: 6, sm: 12, xs: 12 }}>
          <ControlledPassword
            label="Senha*"
            name="password"
            control={control}
            disabled={disabled}
          />
        </Grid>
      )}

      <Grid size={{ lg: withoutPassword ? 6 : 3, md: 6, sm: 12, xs: 12 }}>
        <ControlledSwitch
          label="Solicitar trocar de senha no próximo acesso"
          name="resetPassword"
          control={control}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
}
