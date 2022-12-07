import { createLogger } from '@jakebarnby/altair-graphql-core/build/utils/logger';
import { environment } from 'environments/environment';
export const debug = createLogger(environment);
