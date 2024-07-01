export class RabbitMQAdapter {
  get URLS(): Array<string> {
    return process.env.RABBITMQ_URLS?.split(',');
  }
}
