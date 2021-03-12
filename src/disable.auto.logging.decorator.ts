import { SetMetadata } from '@nestjs/common';

/**
 * This decorator provides a bypass for the auto-logging of HTTP routes that is provided by the LoggingInterceptor. You can set it on a controller
 * or just on an individual route. If you have this decorator and the EnableAutoLogging decorator, with one on the controller and one on an individual
 * route, the one on the individual route will be given preference. If you have both of them set in the same place, whichever one is defined last will
 * be given preference.
 *
 * Example 1:
 *
 * @DisableAutoLogging()
 * @Controller('person')
 * export class PersonController {
 *    @Get('/loggingDisabledRoute')
 *    public async routeDefn() : Promise<any> { // route logic }
 * }
 *
 * Example 2:
 *
 * @Controller('person')
 * export class PersonController {
 *    @DisableAutoLogging()
 *    @Get('/loggingDisabledRoute')
 *    public async routeDefn() : Promise<any> { // route logic }
 * }
 */
export const DisableAutoLogging = () => SetMetadata('autoLoggingDisabled', true);
