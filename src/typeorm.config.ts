import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
   type: "postgres",
   host: "localhost",
   port: 5432,
   username: "postgres",
   password: "q1w2e3r4",
   database: "taskmanagement",
   synchronize: true,
   entities: [__dirname + '/../**/*.entity.{js, ts}']
};