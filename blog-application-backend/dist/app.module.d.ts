import { ServiceBusClient } from "@azure/service-bus";
export declare const connectionString = "Endpoint=sb://basicjsapp-1.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=foNWmEpKFvBCL6fPKZ/ky+s39MI6s9NgGzKHtIf4oIQ=";
export declare const usersQueueName = "userQueue-nestjs";
export declare const blogQueueName = "blogQueue-nestjs";
export declare const sbClientConnection: ServiceBusClient;
export declare class AppModule {
}
