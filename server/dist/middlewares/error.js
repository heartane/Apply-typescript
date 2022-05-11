import { config } from '../config.js';
export const notFound = (req, res, next) => {
    const err = `Not Found: ${req.originalUrl}`;
    res.sendStatus(404);
    next(err);
};
export const errHandler = (err, req, res) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    const data = {
        message: err.message,
        stack: config.server.env === 'development' ? err.stack : null,
    };
    console.error(data);
    res //
        .status(statusCode)
        .json(data);
};
//# sourceMappingURL=error.js.map