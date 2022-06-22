import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  getHello(): string {
    return 'Hello notify service';
  }
}
