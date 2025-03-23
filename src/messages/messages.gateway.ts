import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(86, {cors: true})
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {

 @WebSocketServer() webServer: Server

  constructor(
    private readonly messagesService: MessagesService,
  ) {}
  
  handleConnection(client: Socket) {
    console.log('Cliente conectado', client.id);
    // this.messagesService.registerClient(client);
  }

  handleDisconnect(client: Socket) {
    console.log('Cliente conectado', client.id);
    // this.messagesService.removeClient(client.id);
  }

  // @SubscribeMessage('emitUserEvent')
  emitUserEvent(action: string, username: string){
    this.webServer.emit('user-action' ,`El usuario ${username} realizó la operacion ${action}`);
  }

}
