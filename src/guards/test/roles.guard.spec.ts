import { RolesGuard } from '../roles.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import type { ExecutionContext } from '@nestjs/common';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;
  let jwtService: JwtService;
  let mockContext: Partial<ExecutionContext>;

  beforeEach(() => {
    reflector = new Reflector();
    jwtService = new JwtService({});
    guard = new RolesGuard(reflector, jwtService);

    mockContext = {
      getHandler: jest.fn(), // Mock getHandler as a function
      getClass: jest.fn(), // Mock getClass as a function
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn(),
      }),
    };
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should allow access if no roles are required', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

    expect(guard.canActivate(mockContext as ExecutionContext)).toBe(true);
  });

  it('should deny access if no token is provided', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin']);

    const request = { headers: { authorization: '' } };
    mockContext.switchToHttp = jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue(request),
    });

    expect(guard.canActivate(mockContext as ExecutionContext)).toBe(false);
  });

  it('should allow access if user role matches required role', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin']);

    const request = { headers: { authorization: 'Bearer valid.token' } };
    mockContext.switchToHttp = jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue(request),
    });

    const mockUser = { role: ['admin'] };
    jest.spyOn(jwtService, 'verify').mockReturnValue(mockUser);

    expect(guard.canActivate(mockContext as ExecutionContext)).toBe(true);
  });

  it('should deny access if user role does not match required role', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin']);

    const request = { headers: { authorization: 'Bearer valid.token' } };
    mockContext.switchToHttp = jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue(request),
    });

    const mockUser = { role: ['user'] }; // User role does not match
    jest.spyOn(jwtService, 'verify').mockReturnValue(mockUser);

    expect(guard.canActivate(mockContext as ExecutionContext)).toBe(false);
  });

  it('should throw an error if token verification fails', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin']);

    const request = { headers: { authorization: 'Bearer invalid.token' } };
    mockContext.switchToHttp = jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue(request),
    });

    jest.spyOn(jwtService, 'verify').mockImplementation(() => {
      throw new Error('Invalid token');
    });

    expect(() => guard.canActivate(mockContext as ExecutionContext)).toThrow(Error);
  });
});
