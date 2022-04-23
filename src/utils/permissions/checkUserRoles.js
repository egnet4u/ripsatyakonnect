export const isCommunityAdmin = (user) => {
  if (user.roles.includes("community_admin")) {
    return true;
  }
  return false;
};

export const isSuperAdmin = (user) => {
  if (user.roles.includes("super_admin")) {
    return true;
  }
  return false;
};

export const isManagementAdmin = (user) => {
  if (user.roles.includes("management_admin")) {
    return true;
  }
  return false;
};

export const isBrandManager = (user) => {
  if (user.roles.includes("brand")) {
    return true;
  }
  return false;
}