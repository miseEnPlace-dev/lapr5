import { useInjection } from "inversify-react";

import { TYPES } from "@/inversify/types";
import { useAuth } from "@/hooks/useAuth";
import { IUserService } from "@/service/IService/IUserService";
import { sanitizeRole } from "@/utils/sanitizeRole";

export const useModule = () => {
  const userService = useInjection<IUserService>(TYPES.userService);
  const { username, role } = useAuth();

  const sanitizedRole = role ? sanitizeRole(role) : "";

  const deleteUser = async () => {
    await userService.deleteUser();
  };

  return {
    deleteUser,
    username,
    role: sanitizedRole,
  };
};
