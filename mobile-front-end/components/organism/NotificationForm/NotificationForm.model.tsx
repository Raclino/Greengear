/** @format */

export interface NewNotification {
    name: string;
    date: Date;
    enabled: boolean;
}

export interface NotificationFormProps {
    onAdd: (notification: NewNotification) => void;
    onFinish: () => void;
}
