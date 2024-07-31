const { UserRole } = require('@prisma/client');

const allRoles = {
  [UserRole.USER]: [],
  [UserRole.ADMIN]: ['getUsers', 'manageUsers']
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights
};
