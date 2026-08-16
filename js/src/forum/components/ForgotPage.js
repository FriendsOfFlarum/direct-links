import app from 'flarum/forum/app';
import RedirectToHomeAndOpenModalPage from './RedirectToHomeAndOpenModalPage';

export default class ForgotPage extends RedirectToHomeAndOpenModalPage {
  createModal() {
    if (!app.session.user) {
      return ForgotPasswordModal;
    }
  }
}
