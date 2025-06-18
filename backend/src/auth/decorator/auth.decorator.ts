import { SetMetadata } from '@nestjs/common';
import { AUTH_TYPE_KEY } from '../constant/auth.constant';
import { AuthType } from '../enum/auth-type.enum';

export const Auth = (...authTypes: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);