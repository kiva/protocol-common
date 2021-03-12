import { SetMetadata } from '@nestjs/common';

export const DisableAutoLogging = () => SetMetadata('autoLoggingDisabled', true);
