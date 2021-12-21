import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from "fs";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch = (exception: HttpException, host: ArgumentsHost) => {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorResponse = {
            statusCode: status,
            message: exception.message || null,
            path: request.url,
            method: request.method,
            timestamp: new Date().toISOString(),
        };

        const recLogging = (text: string) => {
            fs.appendFileSync('./logs/logging.log',` ${text}\n` );
        };

        recLogging(`
            ⛩   ERROR: ${request.method}
            URL: ${request.url},
            BODY: ${JSON.stringify(request.body)}
            PARAMS: ${JSON.stringify(request.params)}
            PROCESSING TIME: ${errorResponse.timestamp}
            STATUS CODE: ${errorResponse.statusCode}
            MESSAGE: ${errorResponse.message}`
        );


        Logger.error(
            `${request.method} ${request.url}`,
            JSON.stringify(errorResponse),
            'ExceptionFilter',
        );

        response.status(status).json(errorResponse);
    };
}