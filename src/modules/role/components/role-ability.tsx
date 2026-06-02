import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Button, Checkbox, Collapse } from '@mui/material';

import { ControlledCheckbox } from '@/shared/components/fields';

import { RoleCreateData, RoleAbilityData, RoleUpdateData } from '../domain';

type RoleAbilityProps = {
  index: number;
  ability: Partial<RoleAbilityData>;
  disabled?: boolean;
};

export function RoleAbility({ ability, index, disabled }: RoleAbilityProps) {
  const { control, setValue, watch } = useFormContext<
    RoleCreateData | RoleUpdateData
  >();

  const [open, setOpen] = useState<boolean>(true);

  const watchAbility: RoleAbilityData = watch(`abilities.${index}`);

  const allCheck =
    watchAbility?.canCreate &&
    watchAbility?.canDelete &&
    watchAbility?.canUpdate &&
    watchAbility?.canRead;

  const someCheck =
    watchAbility?.canCreate ||
    watchAbility?.canDelete ||
    watchAbility?.canUpdate ||
    watchAbility?.canRead;

  function handleToggleAllCheck(value: boolean) {
    setValue(`abilities.${index}`, {
      ...watchAbility,
      canCreate: value,
      canDelete: value,
      canUpdate: value,
      canRead: value,
    });
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Button
        variant="text"
        startIcon={open ? <ExpandLess /> : <ExpandMore />}
        color="inherit"
        onClick={() => setOpen((prev) => !prev)}
        sx={{
          paddingX: 2,
          textTransform: 'none',
          fontSize: '1.125rem',
          letterSpacing: 'inherit',
          justifyContent: 'start',
          position: 'relative',
        }}
        endIcon={
          <Checkbox
            title="Marcar todas as permissões dessa categoria"
            sx={{ position: 'absolute', right: 1, top: 0 }}
            onClick={(e) => e.stopPropagation()}
            checked={allCheck}
            indeterminate={!allCheck && someCheck}
            onChange={(_, v) => handleToggleAllCheck(v)}
            disabled={disabled}
          />
        }
      >
        {ability?.name}
      </Button>

      <Collapse in={open}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: 3,
            paddingRight: 2,
          }}
        >
          <ControlledCheckbox
            labelProps={{
              labelPlacement: 'start',
              sx: {
                justifyContent: 'space-between',
              },
            }}
            label="Visualizar"
            name={`abilities.${index}.canRead`}
            control={control}
            disabled={disabled}
          />

          <ControlledCheckbox
            labelProps={{
              labelPlacement: 'start',
              sx: {
                justifyContent: 'space-between',
              },
            }}
            label="Adicionar"
            name={`abilities.${index}.canCreate`}
            control={control}
            disabled={disabled}
          />

          <ControlledCheckbox
            labelProps={{
              labelPlacement: 'start',
              sx: {
                justifyContent: 'space-between',
              },
            }}
            label="Editar"
            name={`abilities.${index}.canUpdate`}
            control={control}
            disabled={disabled}
          />

          <ControlledCheckbox
            labelProps={{
              labelPlacement: 'start',
              sx: {
                justifyContent: 'space-between',
              },
            }}
            label="Excluir"
            name={`abilities.${index}.canDelete`}
            control={control}
            disabled={disabled}
          />
        </Box>
      </Collapse>
    </Box>
  );
}
