import { InjectQueue } from "@nestjs/bullmq";
import { Injectable, Optional } from "@nestjs/common";
import { Queue } from "bullmq";

import { AppBrokers } from "@/configs/config-yml/config.model";
import { ACAP_MSBR } from "@/constants/app.constants";
import { BreakoutUpsertReq } from "@/dtos/breakout-upsert.dto.req";

@Injectable()
export class OutbreakService {
  constructor(
    @Optional() @InjectQueue(ACAP_MSBR) private readonly bullmq: Queue,
  ) {}

  async delegate(reqs: Array<BreakoutUpsertReq>, args: AppBrokers) {
    reqs.forEach(({ realm, contents }) => {
      contents.forEach(({ value }) => {
        args.useBullMQ &&
          this.bullmq?.add(realm, value).catch((error) => error);
      });
    });
  }
}
