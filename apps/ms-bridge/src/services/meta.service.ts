import { Injectable } from "@nestjs/common";

import { ConfigFactoryService } from "./config-factory.service";

@Injectable()
export class MetaService {
  constructor(private readonly configFactory: ConfigFactoryService) {}

  async getMeta() {
    return {
      brokers: this.configFactory.app.brokers,
      services: {
        useSwagger: this.configFactory.app.startSwagger,
      },
    };
  }
}
