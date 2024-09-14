import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import type { ChatUpsertReq } from '@/dtos/chat-upsert.dto.req';

@WebSocketGateway(8081, {
  namespace: 'chats',
  // allowUpgrades: false,
  cors: {
    origin: '*',
  },
})
export class ChatHubGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chats')
  handleClientMessage(@MessageBody() data: ChatUpsertReq, @ConnectedSocket() client: Socket) {
    console.log({ data });

    client.emit('chats', { message: 'Invalid data', data }, (d) => console.log(d));
    // client.on('message', (data) => console.log(data));
    // client.on('chats', (data) => console.log(data));
    return data;
    //console.log('Received data from client:', data);
    //client.emit('serverResponse', { message: 'Data received', data });
  }

  emit(event: string, data: any) {
    return this.server.emit(event, data);
  }
}
