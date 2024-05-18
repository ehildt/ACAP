import { Inject, Injectable } from "@nestjs/common";
import { ItemBucketMetadata } from "minio";
import { Readable } from "stream";

import { MINIO_CLIENT, MinioClient } from "@/modules/minio-client.module";

@Injectable()
export class BlobService {
  constructor(
    @Inject(MINIO_CLIENT) private readonly minioClient: MinioClient,
  ) {}

  async getObject(id: string, bucket: string) {
    return this.minioClient.getObject(bucket, id);
  }

  async putObject(
    bucketName: string,
    objectName: string,
    stream: string | Readable | Buffer,
    size?: number,
    metaData?: ItemBucketMetadata,
  ) {
    await this.minioClient.createBucketIfNotExists(bucketName);
    return this.minioClient.putObject(
      bucketName,
      objectName,
      stream,
      size,
      metaData,
    );
  }
}
