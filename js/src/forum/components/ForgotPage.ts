import app from 'flarum/forum/app';
import RedirectToHomeAndOpenModalPage, { PageModal } from './RedirectToHomeAndOpenModalPage';

export default class ForgotPage extends RedirectToHomeAndOpenModalPage {
  createModal(): PageModal | void {
    if (!app.session.user) {
      return () => import('flarum/forum/components/ForgotPasswordModal');
    }
  }
}
