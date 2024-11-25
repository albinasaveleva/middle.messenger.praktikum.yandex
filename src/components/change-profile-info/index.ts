import Connect from '../../utils/connect';
import ChangeProfileInfo from './change-profile-info';

export default Connect(ChangeProfileInfo, state => ({ user: state.user }));
