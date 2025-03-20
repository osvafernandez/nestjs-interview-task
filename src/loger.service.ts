import { Injectable } from "@nestjs/common";
import * as winston from "winston";
import { Logger } from "winston";
import { winstonConfig } from "./winston.config";

@Injectable()
export class LoggerService {
    private readonly logger: Logger;
 
    constructor() {
        this.logger = winston.createLogger(winstonConfig);
    }

    log(message: string) {
        this.logger.log('info',message);
    }

    error(message: string) {
        this.logger.error('error',message);
    }
}