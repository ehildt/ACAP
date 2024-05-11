import { ConsoleLogger, DynamicModule, Inject, Injectable, Module } from '@nestjs/common';
import { Client, ClientOptions, ItemBucketMetadata, MakeBucketOpt } from 'minio';
import { Readable } from 'stream';

export const MINIO_CLIENT = 'MINIO_CLIENT';
export const MINIO_CLIENT_OPTIONS = 'MINIO_CLIENT_OPTIONS';

type MinioClientModuleProps = {
  imports?: Array<any>;
  inject?: Array<any>;
  providers?: Array<any>;
  isGlobal?: boolean;
  useFactory: (...deps: any) => ClientOptions;
};

@Module({})
export class MinioClientModule {
  static registerAsync(options: MinioClientModuleProps): DynamicModule {
    return {
      module: MinioClientModule,
      imports: options.imports ?? [],
      global: options.isGlobal,
      exports: [MINIO_CLIENT],
      providers: [
        ConsoleLogger,
        MinioClient,
        ...(options.providers ?? []),
        {
          provide: MINIO_CLIENT_OPTIONS,
          inject: options.inject ?? [],
          useFactory: options.useFactory,
        },
        {
          provide: MINIO_CLIENT,
          useExisting: MinioClient,
        },
      ],
    };
  }
}

@Injectable()
export class MinioClient {
  private readonly client: Client;
  constructor(@Inject(MINIO_CLIENT_OPTIONS) private readonly options: ClientOptions) {
    this.client = new Client(this.options);
    this.client.traceOff();
  }

  async createBucketIfNotExists(bucketName: string, region?: string, opts?: MakeBucketOpt) {
    const exists = await this.client.bucketExists(bucketName);
    if (!exists) await this.client.makeBucket(bucketName, region, opts);
  }

  async putObject(
    bucketName: string,
    objectName: string,
    stream: string | Readable | Buffer,
    size?: number,
    metaData?: ItemBucketMetadata,
  ) {
    return await this.client.putObject(bucketName, objectName, stream, size, metaData);
  }

  async getObject(bucketName: string, objectName: string, getOpts?: { versionId?: string }) {
    const file = await this.client.getObject(bucketName, objectName, getOpts);
    const metadata = await this.client.statObject(bucketName, objectName);
    return {
      file,
      metadata,
    };
  }
}
