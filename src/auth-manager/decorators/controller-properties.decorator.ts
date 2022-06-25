import {
  createParamDecorator,
  ExecutionContext,
  ParseArrayPipe,
  Post,
  Query,
} from '@nestjs/common';

const parseArrayPipe = new ParseArrayPipe({ items: String, optional: true });

const getRawTokenFromRequest = (_: string, ctx: ExecutionContext) =>
  ctx.switchToHttp().getRequest().user.refreshToken;

const getTokenFromRequest = (_: string, ctx: ExecutionContext) => {
  const token = ctx.switchToHttp().getRequest().user;
  delete token.refreshToken;
  delete token.iat;
  delete token.exp;
  return token;
};

export const PostLogout = () => Post('logout');
export const PostRefresh = () => Post('refresh');
export const PostSignup = () => Post('signup');
export const PostSignin = () => Post('signin');

export const QueryRefServiceId = () => Query('refServiceId');
export const QueryRefConfigIds = () => Query('refConfigIds', parseArrayPipe);

export const Token = createParamDecorator(getTokenFromRequest);
export const RawToken = createParamDecorator(getRawTokenFromRequest);
