import { UserCreateDTO } from './user-create.dto';

export interface UserUpdateDTO extends Omit<UserCreateDTO, 'password'> {}
