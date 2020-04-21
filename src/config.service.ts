import { Constants } from './constants';
import { Inject } from '@nestjs/common';
import { Logger } from './logger';
import { PackageConstants } from './package.constants';

/**
 * All non secret environment variables are set in this class
 */
export class ConfigService {
    constructor(@Inject(PackageConstants.ENV_SOURCE) private options) {
        Logger.log(`Config "service" running`);
        ConfigService.init(options.source);
    }

    public static init(data: any) {
        let env = { };

        switch (process.env.NODE_ENV) {
            case Constants.SAND:
                env = {...data.default, ...data.sand};
                break;
            case Constants.PROD:
                env = {...data.default, ...data.prod};
                break;
            case Constants.DEV:
                env = {...data.default, ...data.dev};
                break;
            case Constants.LOCAL:
                env = {...data.default, ...data.local};
                break;
            default:
                throw new Error();
                break;
        }

        for (const [name, value] of Object.entries(env)) {

            const field = value as any;
            if (isNaN(field))
                process.env[name] = value as string;
            else
                process.env[name] = (parseInt(field, 10)).toString();
        }

    }
}
