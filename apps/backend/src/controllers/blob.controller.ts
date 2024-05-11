import { Controller, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ShortUniqueId from 'short-unique-id';

import { GetObject } from '@/decorators/controller.method.decorators';
import { ParamUUID } from '@/decorators/controller.parameter.decorators';
import { OpenApi_GetObject, OpenApi_PutObjects } from '@/decorators/open-api.controller.decorators';
import { BlobService } from '@/services/blob.service';
import { ConfigFactoryService } from '@/services/config-factory.service';

const UUID = new ShortUniqueId({ length: 36 });

@ApiTags('Objects')
@Controller('objects')
export class ObjectController {
  constructor(
    private readonly blobService: BlobService,
    private readonly factory: ConfigFactoryService,
  ) {}

  @GetObject()
  @OpenApi_GetObject()
  async getObject(@ParamUUID() uuid: string) {
    return (await this.blobService.getObject(uuid, this.factory.minio.bucket)).file;
  }

  @Post()
  @OpenApi_PutObjects()
  async putObjects(@Request() request: any) {
    const files: AsyncGenerator<any> = request.files();
    if (!files) return;
    const uploadedBlobs: Array<Record<string, any>> = [];
    for await (const file of files) {
      const uuid = UUID.randomUUID();
      const buffer = await file.toBuffer();
      const filename = file.filename;
      const mimetype = file.mimetype;
      await this.blobService.putObject(this.factory.minio.bucket, uuid, buffer, buffer.length, { filename, mimetype });
      uploadedBlobs.push({ filename, mimetype, uuid });
    }

    return uploadedBlobs;
  }
}
