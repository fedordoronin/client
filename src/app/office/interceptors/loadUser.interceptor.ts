import { AuthService } from "../services/auth.service";

export function loadUser (auth: AuthService) {
  return (): Promise<any> => auth.loadUser();
}