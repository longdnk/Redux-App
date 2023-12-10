import { toast } from "sonner";

type MessageType = {
    type: 'success' | 'warning' | 'info' | 'error';
    message: string;
}
export const pushNotification = ({ type, message }: MessageType) => {
    return toast[type](message);
}