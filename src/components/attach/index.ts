import Connect from '../../utils/connect';
import Attach from './attach';

export default Connect(Attach, state => state);
