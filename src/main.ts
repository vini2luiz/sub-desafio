import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); 
  app.enableCors(); // Habilita o CORS, caso necessário para o frontend
  await app.listen(3000); 
  console.log('Application is running on: http://localhost:3000/api');
}
bootstrap();
