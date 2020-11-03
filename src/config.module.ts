import {Constants} from './constants';

/**
 * Reads input data to set environment variables.
 */
export class ConfigModule {

    constructor() {
    }

    public static init(data: any) {
        let env = { };

        switch (process.env.NODE_ENV) {
            case Constants.PROD:
                env = {...data.default, ...data.prod};
                break;
            case Constants.SAND:
                env = {...data.default, ...data.sand};
                break;
            case Constants.QA:
                env = {...data.default, ...data.qa};
                break;
            case Constants.DEV:
                env = {...data.default, ...data.dev};
                break;
            case Constants.LOCAL:
                env = {...data.default, ...data.local};
                break;
            default:
                throw new Error(`NODE_ENV ${process.env.NODE_ENV} is not a valid value`);
        }

        for (const key of Object.keys(env)) {
            // do not set env from env.json if it already exists
            if (process.env[key] !== undefined)
                continue;

            process.env[key] = env[key];
        }

        return this;
    }
}
