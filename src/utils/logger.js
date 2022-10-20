import { createLogger, format, transports } from 'winston'
import __dirname from './path.js'


const timezone = () => {
    return new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires'
    });
}

const Infolevels = {
    info: 0,
    warn: 1,
    error: 2,
}

//Si se quisiese logear en archivos por separado solo cada nivel,
//deberia crear una estructura como la siguiente que permita tener un logger configurado para cada transport que elija
//y seria usado de la siguiente manera: 

//IndependentTrasnportDebugLogger.errorLog.error('mensaje de error')
//IndependentTrasnportDebugLogger.warnLog.warn('mensaje de warn')
//IndependentTrasnportDebugLogger.infoLog.info('mensaje de info')

export const IndependentTrasnportDebugLogger = {
    errorLog: createLogger({

        format: format.combine(
            format.colorize(),
            format.simple(),
            format.timestamp({ format: timezone }),
            format.printf(
                ({ level, message, timestamp }) =>
                    `${timestamp} [${level}] : ${message}`
            )
        ),
        transports: [
            new transports.File({
                maxsize: 5120000,
                maxFiles: 5,
                level: 'error',
                filename: `${__dirname}/logs/error.log`
            }),
        ]
    }),
    warnLog: createLogger({

        format: format.combine(
            format.colorize(),
            format.simple(),
            format.timestamp({ format: timezone }),
            format.printf(
                ({ level, message, timestamp }) =>
                    `${timestamp} [${level}] : ${message}`
            )
        ),
        transports: [
            new transports.File({
                maxsize: 5120000,
                maxFiles: 5,
                level: 'warn',
                filename: `${__dirname}/logs/warn.log`
            })
        ]
    }),
    infoLog: createLogger({

        format: format.combine(
            format.colorize(),
            format.simple(),
            format.timestamp({ format: timezone }),
            format.printf(
                ({ level, message, timestamp }) =>
                    `${timestamp} [${level}] : ${message}`
            )
        ),
        transports: [
            new transports.Console({
                level: Infolevels.info,
            })
        ]
    })
}

const DebugLogger = createLogger({

    format: format.combine(
        format.colorize(),
        format.simple(),
        format.timestamp({ format: timezone }),
        format.printf(
            ({ level, message, timestamp }) =>
                `${timestamp} [${level}] : ${message}`
        )
    ),
    transports: [
        new transports.Console({
            level: Infolevels.info,
        }),
        new transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            level: 'error',
            filename: `${__dirname}/logs/error.log`
        }),
        new transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            level: 'warn',
            filename: `${__dirname}/logs/warn.log`
        })
    ]
})


const ProdLogger = createLogger({

    format: format.combine(
        format.colorize(),
        format.simple(),
        format.timestamp({ format: timezone }),
        format.printf(
            ({ level, message, timestamp }) =>
                `${timestamp} [${level}] : ${message}`
        )
    ),
    transports: [
        new transports.Console({
            level: Infolevels.info,
        }),
        new transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            level: 'error',
            filename: `${__dirname}/logs/error.log`,
            defaultMeta: {
                service: 'admin-service',
            },
        }),
        new transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            level: 'warn',
            filename: `${__dirname}/logs/warn.log`
        })
    ]
})

export const logger = DebugLogger