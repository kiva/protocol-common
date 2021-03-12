import { SetMetadata } from '@nestjs/common';

/**
 * This decorator is the pair to the DisableAutoLogging decorator. You don't normally need to use it, since logging of routes is enabled by default if
 * you're using the LoggingInterceptor. The purpose of it is to provide an override of the DisableAutoLogging decorator. In other words, if you have
 * set @DisableAutoLogging() on a controller, you can re-enable auto-logging on a specific route by setting @EnableAutoLogging().
 *
 * Example 1:
 *
 * @DisableAutoLogging()
 * @Controller('person')
 * export class PersonController {
 *
 *    @Get('/loggingDisabledRoute')
 *    public async routeDefn1() : Promise<any> { // route logic }
 *
 *    @EnableAutoLogging()
 *    @Get('/loggingEnabledRoute')
 *    public async routeDefn2() : Promise<any> { // route logic }
 * }
 */
export const EnableAutoLogging = () => SetMetadata('autoLoggingDisabled', false);
