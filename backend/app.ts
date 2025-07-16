import Fastify from "fastify";
import videosRoutes from "./src/routes/videosRoute";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import cors from "@fastify/cors";

const app = Fastify({ logger: true })
  .setValidatorCompiler(validatorCompiler)
  .setSerializerCompiler(serializerCompiler)
  .withTypeProvider<ZodTypeProvider>()
  .register(cors, {
    origin: true,
  });

app.register(videosRoutes, { prefix: "/api/videos" });

app.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) throw err;
  app.log.info(`Server running at ${address}`);
});

export default app;
