export interface SubscriberInterface {
    active(): boolean;
    execute(): void;
}