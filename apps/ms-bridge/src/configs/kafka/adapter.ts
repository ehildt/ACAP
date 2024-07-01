export class KafkaAdapter {
  get CLIENT_ID(): string {
    return process.env.KAFKA_CLIENT_ID;
  }

  get BROKERS(): Array<string> {
    return process.env.KAFKA_BROKERS?.split(',');
  }

  get SSL(): boolean {
    return process.env.KAFKA_SSL === 'true';
  }

  get RETRIES(): number {
    return parseInt(process.env.KAFKA_RETRIES, 10);
  }

  get RETRY_TIME(): number {
    return parseInt(process.env.KAFKA_RETRY_TIME, 10);
  }

  get RETRY_FACTOR(): number {
    return parseInt(process.env.KAFKA_RETRY_FACTOR, 10);
  }

  get RETRY_SCALAR(): number {
    return parseInt(process.env.KAFKA_RETRY_SCALAR, 10);
  }

  get RETRY_MAX_TIMES(): number {
    return parseInt(process.env.KAFKA_RETRY_MAX_TIMES, 10);
  }
}
