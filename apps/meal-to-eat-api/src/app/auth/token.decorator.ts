import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Id } from '@MealToEat/data';

export interface Token {
  username: Id,
  id: string,
}

export const InjectToken = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const response = ctx.switchToHttp().getResponse();
    console.log(response.locals.token);
    
    return response.locals.token;
  },
);