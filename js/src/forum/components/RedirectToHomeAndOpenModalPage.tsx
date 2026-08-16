import type Mithril from 'mithril';
import app from 'flarum/forum/app';
import Page, { IPageAttrs } from 'flarum/common/components/Page';

/**
 * A modal to show, either a modal class or a callback returning a promise that
 * resolves to one (for lazy loaded modals).
 */
export type PageModal = Parameters<typeof app.modal.show>[0];

export default abstract class RedirectToHomeAndOpenModalPage<CustomAttrs extends IPageAttrs = IPageAttrs> extends Page<CustomAttrs> {
  oninit(vnode: Mithril.Vnode<CustomAttrs, this>) {
    super.oninit(vnode);

    m.route.set('/');

    const modal = this.createModal();

    if (modal) {
      setTimeout(() => app.modal.show(modal), 1500);
    }
  }

  /**
   * Return the modal to show once we have redirected home, or nothing if no
   * modal should be shown.
   */
  createModal(): PageModal | void {
    return;
  }

  view() {
    return <div />;
  }
}
