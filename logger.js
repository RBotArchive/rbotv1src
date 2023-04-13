const path = require("path");
const Logger = require("leekslazylogger");
module.exports = new Logger({
    debug: process.env.MODE === "dev",
    directory: path.join(__dirname, "./logs/"),
    keepFor: 30,
    levels: {
        _logger: { format: "&f{timestamp}&r [LOGGER] {text}" },
        basic: { format: "&f{timestamp} {text}" },
        commands: {
            format: "&f{timestamp}&r &3[INFO] &d(COMMANDS)&r {text}",
            type: "info",
        },
        console: { format: "&f{timestamp} [INFO] {text}" },
        debug: { format: "&f{timestamp}&r &1[DEBUG] &9{text}" },
        error: { format: "&f{timestamp}&r &4[ERROR] &c{text}" },
        http: {
            format: "&f{timestamp}&r &3[INFO] &d(HTTP)&r {text}",
            type: "info",
        },
        info: { format: "&f{timestamp}&r &3[INFO] &b{text}" },
        notice: { format: "&f{timestamp}&r &0&!6[NOTICE] {text}" },
        plugins: {
            format: "&f{timestamp}&r &3[INFO] &d(PLUGINS)&r {text}",
            type: "info",
        },
        success: { format: "&f{timestamp}&r &2[SUCCESS] &a{text}" },
        warn: { format: "&f{timestamp}&r &6[WARN] &e{text}" },
        ws: {
            format: "&f{timestamp}&r &3[INFO] &d(WS)&r {text}",
            type: "info",
        },
    },
    logToFile: true,
    name: "RBot",
    splitFile: true,
    timestamp: "YYYY-MM-DD HH:mm:ss",
});
