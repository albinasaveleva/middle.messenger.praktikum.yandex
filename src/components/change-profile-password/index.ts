import { TState } from '../../types/data';
import Connect from '../../utils/connect';
import ChangeProfilePassword from './change-profile-password';

export default Connect(ChangeProfilePassword, (state: TState) => ({ user: state.user }));
