import { format, transports } from "winston";

export const winstonConfig = {
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        }),
        new transports.File({
            filename: 'logs/combined.log',
            format: format.combine(
                format.timestamp(),
                format.json()
            ) 
        }),
        new transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        })
    ]
}