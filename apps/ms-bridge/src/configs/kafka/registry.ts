import { registerAs } from "@nestjs/config";

import { KafkaAdapter } from "./adapter";

export const KafkaRegistry = registerAs(
  "Kafka",
  async () => new KafkaAdapter(),
);
