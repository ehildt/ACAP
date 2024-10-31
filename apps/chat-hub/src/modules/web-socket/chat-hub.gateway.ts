import { ConsoleLogger, HttpStatus } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Socket } from 'dgram';
import { Server } from 'socket.io';

import { ChatUpsertReq } from '@/dtos/chat-upsert.dto.req';

@WebSocketGateway(8081, {
  namespace: 'chats',
  cors: {
    origin: '*',
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: false,
  },
})
export class ChatHubGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly logger: ConsoleLogger) {}

  @SubscribeMessage('chats')
  protected async handleClientMessage(@MessageBody() data: Array<ChatUpsertReq>, @ConnectedSocket() client: Socket) {
    // ! handle ChatUpsertReq before emitting.
    // TODO: handle persistance, encryption etc.
    // * if data.persist use bullMQ or RabbitMQ
    // * to push the message to the database service

    try {
      await this.validate(ChatUpsertReq, data);

      // send to recipients as private message if declared
      client.emit(data.at(0).topic.name, 'yay');
    } catch (error) {
      return error;
    }
  }

  emit(event: string, data: any) {
    return this.server.emit(event, data);
  }

  private async validate<C extends ClassConstructor<any>, D = any>(cls: C, obj: D) {
    if (!Array.isArray(obj) || !obj?.length)
      this.logger.warn(`${this.handleClientMessage.name} - skipped empty message`);

    const errors = (
      await Promise.all(
        plainToInstance(cls, obj)?.map(async (item) => await validate(item, { forbidUnknownValues: true })),
      )
    )?.flat();

    if (errors?.length)
      throw {
        message: 'Validation not passed.',
        status: HttpStatus.BAD_REQUEST,
        gateway: this.constructor.name,
        handler: this.handleClientMessage.name,
        errors: errors.flatMap(({ constraints, property }) => [{ property, constraints: Object.values(constraints) }]),
      };
  }
}
