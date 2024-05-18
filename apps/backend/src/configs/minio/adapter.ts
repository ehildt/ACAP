export class MinioConfigAdapter {
  get ENDPOINT(): string {
    return process.env.MINIO_ENDPOINT;
  }

  get USE_SSL(): boolean {
    return process.env.MINIO_USE_SSL == "true";
  }

  get PORT(): number {
    return parseInt(process.env.MINIO_PORT, 10);
  }

  get ACCESS_KEY(): string {
    return process.env.MINIO_ACCESS_KEY;
  }

  get SECRET_KEY(): string {
    return process.env.MINIO_SECRET_KEY;
  }

  get BUCKET(): string {
    return process.env.MINIO_BUCKET;
  }
}
