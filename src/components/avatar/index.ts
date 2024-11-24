import Connect from '../../utils/connect';
import Avatar from './avatar';

// export default Connect(Avatar, state => state.user ?? {});
export default Connect(Avatar, () => {});
