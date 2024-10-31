import { ConsoleLogger, Injectable } from '@nestjs/common';

import { Message } from '@/dtos/message.dto';
import { MessageRepository } from '@/repositories/message.repository';

@Injectable()
export class ChatHubArchiveService {
  constructor(
    private readonly logger: ConsoleLogger,
    private readonly messageRepository: MessageRepository,
  ) {}

  async messages() {
    return this.messageRepository.findAll();
  }

  async insert(reqs: Array<Message>) {
    return this.messageRepository.insert(reqs);
  }

  async log(req: Message) {
    console.log('Processing job:', JSON.stringify(req, null, 4), this.constructor.name);
  }
}
