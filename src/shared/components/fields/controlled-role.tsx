import { useEffect, useState } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import { AutocompleteProps } from '@mui/material';

import { formatErrorForNotification } from '@/shared/utils/error';

import { ControlledAutocomplete } from './';

import { RoleRepository } from '@/modules/role/repositories';
import { RoleListDTO, Role } from '@/modules/role/domain';

interface Props
  extends UseControllerProps<any>,
    Omit<
      AutocompleteProps<any, boolean, boolean, boolean>,
      | 'defaultValue'
      | 'name'
      | 'renderInput'
      | 'options'
      | 'getOptionLabel'
      | 'isOptionEqualToValue'
    > {
  label?: string;
  optionsParams?: RoleListDTO;
}

export function ControlledRole({ optionsParams, ...props }: Props) {
  const { field } = useController(props);
  const repository = new RoleRepository();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [roles, setRoles] = useState<Array<Role>>([]);

  async function getRoles() {
    if (loading) return;

    try {
      setLoading(true);
      setError(undefined);

      const { data } = await repository.list({
        filters: {
          ...optionsParams?.filters,
        },
        pagination: {
          ...optionsParams?.pagination,
        },
      });

      setRoles(data.map((role) => new Role(role)));
    } catch (error) {
      setError(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <ControlledAutocomplete
      {...props}
      options={roles}
      loading={loading}
      noOptionsText={error}
      getOptionLabel={(role: Role) => role?.name ?? ''}
      isOptionEqualToValue={(option, selected) => option?.id === selected?.id}
      value={roles.find((role) => role.id === field.value?.id) || null}
      onChange={(_, newValue) => field.onChange(new Role(newValue || {}))}
      slotProps={{
        ...props.slotProps,
      }}
    />
  );
}
