import { Test, TestingModule } from '@nestjs/testing';

import { BlobService } from '@/services/blob.service';
import { ConfigFactoryService } from '@/services/config-factory.service';

import { ObjectController } from './blob.controller';

describe('ObjectController', () => {
  let controller: ObjectController;
  let blobService: BlobService;
  let factoryService: ConfigFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObjectController],
      providers: [
        {
          provide: BlobService,
          useValue: {
            getObject: jest.fn(),
            putObject: jest.fn(),
          },
        },
        {
          provide: ConfigFactoryService,
          useValue: {
            minio: { bucket: 'test-bucket' },
          },
        },
      ],
    }).compile();

    controller = module.get<ObjectController>(ObjectController);
    blobService = module.get<BlobService>(BlobService);
    factoryService = module.get<ConfigFactoryService>(ConfigFactoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getObject', () => {
    it('should call blobService.getObject with correct cuid2 and bucket', async () => {
      const cuid2 = 'test-cuid2';
      const result = { file: 'test-file' as any };
      jest.spyOn(blobService, 'getObject').mockResolvedValueOnce(result as any);
      await expect(controller.getObject(cuid2)).resolves.toEqual(result.file);
      expect(blobService.getObject).toHaveBeenCalledWith(cuid2, factoryService.minio.bucket);
    });
  });

  describe('putObjects', () => {
    it('should call blobService.putObject for each file and return uploaded blobs', async () => {
      const request = {
        files: jest.fn().mockImplementation(() => [
          {
            toBuffer: jest.fn().mockResolvedValueOnce(Buffer.from('test-data')),
            filename: 'test.txt',
            mimetype: 'text/plain',
          },
          {
            toBuffer: jest.fn().mockResolvedValueOnce(Buffer.from('test-data')),
            filename: 'test2.txt',
            mimetype: 'text/plain',
          },
        ]),
      };
      const expectedUploadedBlobs = [
        {
          filename: 'test.txt',
          mimetype: 'text/plain',
          cuid2: expect.any(String),
        },
        {
          filename: 'test2.txt',
          mimetype: 'text/plain',
          cuid2: expect.any(String),
        },
      ];

      await expect(controller.putObjects(request)).resolves.toEqual(expectedUploadedBlobs);

      expect(blobService.putObject).toHaveBeenCalledTimes(2);
      expect(blobService.putObject).toHaveBeenCalledWith(
        factoryService.minio.bucket,
        expect.any(String),
        expect.any(Buffer),
        expect.any(Number),
        expect.objectContaining({
          filename: 'test.txt',
          mimetype: 'text/plain',
        }),
      );
      expect(blobService.putObject).toHaveBeenCalledWith(
        factoryService.minio.bucket,
        expect.any(String),
        expect.any(Buffer),
        expect.any(Number),
        expect.objectContaining({
          filename: 'test2.txt',
          mimetype: 'text/plain',
        }),
      );
    });
  });
});
