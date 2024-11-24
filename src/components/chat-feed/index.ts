import Connect from '../../utils/connect';
import ChatFeed from './chat-feed';

export default Connect(ChatFeed, state => state);
