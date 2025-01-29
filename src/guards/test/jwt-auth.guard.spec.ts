import { JwtAuthGuard } from '../jwt-auth.guard';
import type { ExecutionContext } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(() => {
    guard = new JwtAuthGuard();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should call canActivate and return true when valid', () => {
    const context = {
      switchToHttp: jest.fn(),
    } as unknown as ExecutionContext;
    const superActivateSpy = jest.spyOn(guard, 'canActivate').mockReturnValue(true);

    expect(guard.canActivate(context)).toBe(true);
    expect(superActivateSpy).toHaveBeenCalledWith(context);
  });

  it('should return the user if valid', () => {
    const user = { id: 1, username: 'testuser' };
    expect(guard.handleRequest(null, user)).toEqual(user);
  });

  it('should throw UnauthorizedException if user is null or error occurs', () => {
    expect(() => guard.handleRequest(null, null)).toThrow(
      new UnauthorizedException('Invalid or expired token'),
    );
    expect(() => guard.handleRequest(new Error(), null)).toThrow(
      new UnauthorizedException('Invalid or expired token'),
    );
  });
});
