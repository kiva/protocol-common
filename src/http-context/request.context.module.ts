import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RequestContextMiddleware } from './request.context.middleware';
import { HttpModule } from '@nestjs/axios';

/**
 * RequestContext module.
 */
@Module({
    imports: [HttpModule],
    controllers: [],
})
export class RequestContextModule implements NestModule {
  constructor() {}

  /**
   * Apply http-context-middleware for all routes.
   * @param consumer
   */
  configure(consumer: MiddlewareConsumer) {
      // We need to handle the request-context as middleware for all routes.
      consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
