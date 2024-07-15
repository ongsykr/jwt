import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  login(id: string, password: string) {
    return this.authRepository.login(id, password);
  }

  create(id: string, password: string) {
    return this.authRepository.createUser(id, password);
  }

  // refresh(refresh: string) {
  //   return this.authRepository.
  // }
}
