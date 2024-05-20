export class KafkaAdapter {
  get CLIENT_ID(): string {
    return process.env.KAFKA_CLIENT_ID;
  }

  get GROUP_ID(): string {
    return process.env.KAFKA_GROUP_ID;
  }

  get BROKERS(): Array<string> {
    return process.env.KAFKA_BROKERS?.split(",");
  }
}
