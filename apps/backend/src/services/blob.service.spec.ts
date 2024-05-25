import { Test, TestingModule } from "@nestjs/testing";

import { MINIO_CLIENT } from "@/modules/minio-client.module";

import { BlobService } from "./blob.service";

describe("BlobService", () => {
  let service: BlobService;
  const mockMinioClient = {
    getObject: jest.fn(),
    createBucketIfNotExists: jest.fn(),
    putObject: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlobService,
        {
          provide: MINIO_CLIENT,
          useValue: mockMinioClient,
        },
      ],
    }).compile();

    service = module.get<BlobService>(BlobService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getObject", () => {
    it("should call minioClient.getObject with correct parameters", async () => {
      const id = "test-id";
      const bucket = "test-bucket";
      await service.getObject(id, bucket);
      expect(mockMinioClient.getObject).toHaveBeenCalledWith(bucket, id);
    });
  });

  describe("putObject", () => {
    it("should call minioClient.createBucketIfNotExists and minioClient.putObject with correct parameters", async () => {
      const bucketName = "test-bucket";
      const objectName = "test-object";
      const stream = "test-stream";
      const size = 123;
      const metaData = { key: "value" };
      await service.putObject(bucketName, objectName, stream, size, metaData);
      expect(mockMinioClient.createBucketIfNotExists).toHaveBeenCalledWith(
        bucketName,
      );
      expect(mockMinioClient.putObject).toHaveBeenCalledWith(
        bucketName,
        objectName,
        stream,
        size,
        metaData,
      );
    });
  });
});
