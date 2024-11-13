export type TProps = {
  attr?: { [key: string]: string };
  events?: { [key: string]: EventListenerOrEventListenerObject };
  _id?: string;
  user?: { [key: string]: string };
  authorization?: boolean;
}
