import { TState } from '../../types/data';
import Connect from '../../utils/connect';
import ChangeProfileInfo from './change-profile-info';

export default Connect(ChangeProfileInfo, (state: TState) => ({ user: state.user }));
