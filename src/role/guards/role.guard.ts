import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GetUser } from 'src/auth/decorator';


@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles: string[] = this._reflector.get<string[]>(
      'rolename',
      context.getHandler(),
    );

    
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;
    var hasRole = false;
    if(roles.includes(user.rolename)){
      hasRole = true;
    }
    // const hasRole = () =>  (user.rolename => roles.includes(rolename) )
    console.log({
      user,
      
    })
    return user && user.rolename && roles.includes(user.rolename);
  
  }
}