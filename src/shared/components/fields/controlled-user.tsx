import { useEffect, useState } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import { AutocompleteProps } from '@mui/material';
import { formatErrorForNotification } from '@/shared/utils/error';
import { ControlledAutocomplete } from './controlled-autocomplete';
import { UserRepository } from '@/modules/user/repositories';
import { User } from '@/modules/user/domain/entities/user.entity';

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
}

export function ControlledUser({ ...props }: Props) {
    const { field } = useController(props);
    const repository = new UserRepository();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [users, setUsers] = useState<Array<User>>([]);

    async function getUsers() {
        if (loading) return;

        try {
            setLoading(true);
            setError(undefined);

            const response = await repository.list();
            setUsers(response.data.map(user => new User(user)));
        } catch (error) {
            setError(formatErrorForNotification(error));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <ControlledAutocomplete
            {...props}
            options={users}
            loading={loading}
            noOptionsText={error}
            getOptionLabel={(user: User) => user?.name ?? ''}
            isOptionEqualToValue={(option, selected) => option?.id === selected?.id}
            value={users.find((user) => user.id === field.value?.id)}
            onChange={(_, newValue) => {
                field.onChange(newValue || undefined);
            }}
            slotProps={{
                ...props.slotProps,
            }}
        />
    );
}