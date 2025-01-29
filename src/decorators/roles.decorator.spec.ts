import { Roles, ROLES_KEY } from 'src/decorators/roles.decorator';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/user/user-role.enum';

describe('Roles Decorator', () => {
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
  });

  it('should set the correct roles metadata', () => {
    // Apply the Roles decorator to a sample class or method
    class TestClass {
      @Roles(UserRole.ADMIN, UserRole.USER)
      someMethod() {}
    }

    // Retrieve metadata using Reflector
    const roles = reflector.get(ROLES_KEY, TestClass.prototype.someMethod);

    // Check if metadata is set correctly
    expect(roles).toEqual([UserRole.ADMIN, UserRole.USER]);
  });
});
