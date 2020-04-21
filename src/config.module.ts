import {DynamicModule, Module} from '@nestjs/common';
import {ConfigService} from './config.service';
import { PackageConstants } from './package.constants';


// https://docs.nestjs.com/fundamentals/dynamic-modules#config-module-example
@Module({})
export class ConfigModule {
    static register(data: any): DynamicModule {
        return {
            module: ConfigModule,
            providers: [
                {
                    provide: PackageConstants.ENV_SOURCE,
                    useValue: data,
                },
                ConfigService,
            ],
            exports: [ConfigService],
        };
    }
}
