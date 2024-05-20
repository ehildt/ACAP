import { registerAs } from "@nestjs/config";

import { KafkaAdapter } from "./adapter";

export const KafkaRegistry = registerAs(
  "KafkaClient",
  async () => new KafkaAdapter(),
);
