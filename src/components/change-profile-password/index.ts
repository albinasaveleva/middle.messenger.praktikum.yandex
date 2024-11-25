import Connect from '../../utils/connect';
import ChangeProfilePassword from './change-profile-password';

export default Connect(ChangeProfilePassword, state => ({ user: state.user }));
