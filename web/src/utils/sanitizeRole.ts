export function sanitizeRole(role: string) {
  return role === "user"
    ? "User"
    : role.charAt(0).toUpperCase() + role.slice(1) + " Manager";
}
