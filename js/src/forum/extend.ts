import Extend from 'flarum/common/extenders';

export default [
  new Extend.Routes() //
    .add('directLinksLogin', '/login', () => import('./components/LoginPage'))
    .add('directLinksSignup', '/signup', () => import('./components/SignupPage'))
    .add('directLinksForgot', '/forgot', () => import('./components/ForgotPage'))
    .add('directLinksComposer', '/composer', () => import('./components/ComposerPage')),
];
