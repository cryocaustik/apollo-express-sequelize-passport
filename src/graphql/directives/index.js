const {
  AuthenticationError,
  ForbiddenError,
  SchemaDirectiveVisitor,
} = require("apollo-server-express");
const { defaultFieldResolver } = require("graphql");

/**
 * Auth Directive to check if user is authenticated.
 */
class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (...args) {
      const { user } = args[2];

      if (!user) throw new AuthenticationError("unauthorized");

      return resolve.apply(this, args);
    };
  }

  visitObject(type) {
    this.ensureFieldsWrapped(type);
  }

  ensureFieldsWrapped(objectType) {
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function (...args) {
        const user = args[2].user;
        if (!user) throw new AuthenticationError("user not authenticated");

        return resolve.apply(this, args);
      };
    });
  }
}

/**
 * Role Directive to check if user has specified Role.
 */
class RoleDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    this.ensureFieldsWrapped(type);
    type._requiredAuthRole = this.args.requires;
  }
  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);
    field._requiredAuthRole = this.args.requires;
  }

  ensureFieldsWrapped(objectType) {
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function (...args) {
        const requiredRole =
          field._requiredAuthRole || objectType._requiredAuthRole;

        if (!requiredRole) {
          return resolve.apply(this, args);
        }

        const user = args[2].user;
        if (!user) throw new AuthenticationError("user not authenticated");

        const userRole = await user.getRole();
        if (!userRole)
          throw new ForbiddenError(`user not authorized: ${userRole.name}`);

        if (userRole.name !== requiredRole && userRole.name !== "Admin")
          throw new ForbiddenError(`user not authorized: ${userRole.name}`);

        return resolve.apply(this, args);
      };
    });
  }
}

module.exports = { AuthDirective, RoleDirective };
