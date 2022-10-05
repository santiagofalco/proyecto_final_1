import yargs from "yargs";
import config from "./config/config.js";

const defaultPort = config.app.PORT

const {argv} = yargs(process.argv.slice(2)).alias({p:'port'})

const PORT = () => {
    if (argv.hasOwnProperty('port')) {
        return {
            port: argv.port,
            message: `Server listening on port: ${argv.port}`,
        }
    } else {
        return {
            port: defaultPort,
            message: `Server listening on default port: ${defaultPort}`,
        }
    }
}


export default PORT