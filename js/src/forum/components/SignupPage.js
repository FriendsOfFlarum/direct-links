import app from 'flarum/forum/app';
import RedirectToHomeAndOpenModalPage from './RedirectToHomeAndOpenModalPage';

export default class SignupPage extends RedirectToHomeAndOpenModalPage {
  createModal() {
    if (!app.session.user) {
      return SignUpModal;
    }
  }
}
