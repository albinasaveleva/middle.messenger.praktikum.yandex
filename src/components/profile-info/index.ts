import Connect from "../../utils/connect";
import Avatar from "../avatar/avatar";
import ProfileInfo from "./profile-info";

export default Connect(ProfileInfo, (state) => {
    return {
        user: state.user,
        avatar: new Avatar({
            attr: {
                class: 'avatar'
            },
            image: state.user?.avatar ? `<img src="https://ya-praktikum.tech/api/v2/resources${state.user.avatar}" alt="Avatar">` : '',
            events: {
                mouseover: (event: Event) => {
                    const avatarWrapper = (event.target as HTMLElement).closest('.avatar-wrapper');
                    const avatarHover = (avatarWrapper as HTMLElement).querySelector('.avatar-hover');
                    (avatarHover as HTMLElement).style.display = "flex";
                },
                mouseout: (event: Event) => {
                    const avatarWrapper = (event.target as HTMLElement).closest('.avatar-wrapper');
                    const avatarHover = (avatarWrapper as HTMLElement).querySelector('.avatar-hover');
                    (avatarHover as HTMLElement).style.display = "none";
                },
                click: () => {
                    const avatarModal = document.querySelector('#avatar-modal') as HTMLElement;
                    avatarModal.style.display = 'flex';
                }
            }
        }, 'div'),
        name: state.user?.display_name || "",
    }
});
