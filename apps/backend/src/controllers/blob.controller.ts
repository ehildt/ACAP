import { Controller, Post, Request } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { init } from "@paralleldrive/cuid2";

import { GetObject } from "@/decorators/controller.method.decorators";
import { ParamCUID2 } from "@/decorators/controller.parameter.decorators";
import {
  OpenApi_GetObject,
  OpenApi_PutObjects,
} from "@/decorators/open-api.controller.decorators";
import { BlobService } from "@/services/blob.service";
import { ConfigFactoryService } from "@/services/config-factory.service";

const createId = init({ length: 32, fingerprint: "acap-cuid2" });

@ApiTags("Objects")
@Controller("objects")
export class ObjectController {
  constructor(
    private readonly blobService: BlobService,
    private readonly factory: ConfigFactoryService,
  ) {}

  @GetObject()
  @OpenApi_GetObject()
  async getObject(@ParamCUID2() cuid2: string) {
    return (await this.blobService.getObject(cuid2, this.factory.minio.bucket))
      .file;
  }

  @Post()
  @OpenApi_PutObjects()
  async putObjects(@Request() request: any) {
    const files: AsyncGenerator<any> = request.files();
    const uploadedBlobs: Array<Record<string, any>> = [];
    for await (const file of files) {
      const cuid2 = createId();
      const buffer = await file.toBuffer();
      const filename = file.filename;
      const mimetype = file.mimetype;
      await this.blobService.putObject(
        this.factory.minio.bucket,
        cuid2,
        buffer,
        buffer.length,
        { filename, mimetype },
      );
      uploadedBlobs.push({ filename, mimetype, cuid2 });
    }

    return uploadedBlobs;
  }
}
