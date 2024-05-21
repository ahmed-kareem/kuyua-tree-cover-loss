const winston = require("winston");
module.exports = function(error, req, res, next)
{
    const logger = winston.createLogger({
        level: 'error',
        format: winston.format.json(),
        transports: [new winston.transports.File({ filename: 'Logs/app.log' })],
      });
    logger.error(error.message, error);
    res.status(500).json({success: false, message: error.message})
}