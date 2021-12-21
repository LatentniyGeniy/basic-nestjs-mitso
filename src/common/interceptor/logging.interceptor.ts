import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept = (context: ExecutionContext, next: CallHandler): Observable<any> => {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();

        const startTime = Date.now();
        const logsFolder = path.join(__dirname, '../../logs');

        if (!fs.existsSync(logsFolder)) {
            fs.mkdirSync(logsFolder);
        }

        const recLogging = (text: string) => {
            fs.appendFileSync('./logs/logging.log', `${text}\n`);
        };

        return next.handle().pipe(
            tap(() => {
                const processTime = Date.now() - startTime;
                recLogging(
                    ` ⛩   REQUEST: ${req.method} 
                          URL: ${req.url}, 
                          BODY: ${JSON.stringify(req.body)}
                          PARAMS: ${JSON.stringify(req.params)} 
                          PROCESSING TIME: ${processTime} 
                          STATUS CODE: ${res.statusCode}\n`,
                    );

                Logger.log(
                    `⛩  REQUEST: ${req.method} URL: ${req.url}, BODY: ${JSON.stringify(
                        req.body,
                    )} PARAMS: ${JSON.stringify(req.params)} PROCESSING TIME: ${processTime} STATUS CODE: ${
                        res.statusCode
                    }`,
                    'Restful',
                );
            }),
        );
    };
}