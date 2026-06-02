import { useFormContext } from 'react-hook-form';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid2 as Grid,
  LinearProgress,
  Typography,
} from '@mui/material';

import { RoleCreateData, RoleUpdateData } from '../domain';
import { RoleAbility } from './role-ability';

type RoleAbilitiesProps = {
  loading?: boolean;
  disabled?: boolean;
};

export function RoleAbilities({ loading, disabled }: RoleAbilitiesProps) {
  const { setValue, watch } = useFormContext<RoleCreateData | RoleUpdateData>();

  const abilities = watch('abilities');

  const everyCheck = abilities?.every(
    (ability) =>
      ability.canCreate &&
      ability.canDelete &&
      ability.canUpdate &&
      ability.canRead,
  );

  const someCheck = abilities?.some(
    (ability) =>
      ability.canCreate ||
      ability.canDelete ||
      ability.canUpdate ||
      ability.canRead,
  );

  function handleToggleAllAbilities(value: boolean) {
    setValue(
      'abilities',
      abilities?.map((ability) => ({
        ...ability,
        canCreate: value,
        canDelete: value,
        canUpdate: value,
        canRead: value,
      })) ?? [],
    );
  }

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6">Permissões</Typography>

        <FormControlLabel
          disabled={loading || disabled}
          labelPlacement="start"
          label="Marcar todas as permissões"
          control={
            <Checkbox
              checked={everyCheck}
              indeterminate={!everyCheck && someCheck}
              onChange={(_, value) => handleToggleAllAbilities(value)}
            />
          }
        />
      </Box>

      {loading && <LinearProgress sx={{ width: '100%' }} />}

      <Grid container spacing={2} width="100%">
        {abilities?.map((ability, index) => (
          <Grid key={ability?.reference || index} size={{ md: 6, xs: 12 }}>
            <RoleAbility index={index} ability={ability} disabled={disabled} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
