export const isRolePath = (pathname, roles = []) => {
  return roles.some((role) => pathname.startsWith(`/${role}`));
};
export const allowedRoles = ["shopkeeper", "admin", "deliveryboy", "user"];
