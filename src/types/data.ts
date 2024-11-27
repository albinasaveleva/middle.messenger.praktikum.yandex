export type TProps = {
  attr?: { [key: string]: string };
  events?: { [key: string]: EventListenerOrEventListenerObject };
  _id?: string;
  user?: { [key: string]: string };
  authorization?: boolean;
}

export type TState = {
    user: {
        avatar: null | string,
        display_name: null | string,
        email: string,
        first_name: string,
        id: number,
        login: string,
        phone: string,
        second_name: string
    } | null,
    chatList: [],
    currentChat: {
        id: number,
        title: string,
        messages: [],
        checkedOld: false,
    } | null,
    socketReadyState: number | null
};

export type TChat = {
    avatar: string| null,
    created_by: number,
    id: number
    last_message: {
        content: string,
        id: number,
        time: string
    } | null,
    title: string,
    unread_count: number
}
