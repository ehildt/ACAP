import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

import { BULLMQ_PERSISTANCE_QUEUE } from '@/constants/app.constants';
import { Message } from '@/dtos/message.dto';
import { ChatHubArchiveService } from '@/services/chat-hub-archive.service';

@Processor(BULLMQ_PERSISTANCE_QUEUE)
export class MessageProcessor extends WorkerHost {
  constructor(private readonly archive: ChatHubArchiveService) {
    super();
  }

  async process(job: Job<Message>) {
    await this.archive.log(job.data);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`Job ${job.id} completed successfully.`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    console.log(`Job ${job.id} failed to process.`);
  }
}
