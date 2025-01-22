import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as acceptLanguage from 'accept-language-parser';

@Injectable()
export class LanguageMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const languages = ['en', 'ar'];
    const userLang = acceptLanguage.pick(languages, req.headers['accept-language']);
    req.headers['language'] = userLang || 'en';
    next();
  }
}
