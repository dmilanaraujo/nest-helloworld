import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ActionsService} from "./roles/actions.service";
import {RolesModule} from "./roles/roles.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const actionsService = app.select(RolesModule).get(ActionsService, { strict: true });
    const actionsService = app.get(ActionsService);
  actionsService.test(app);
  await app.listen(3000);
}
bootstrap();
