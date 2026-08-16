import app from 'flarum/forum/app';
import Page from 'flarum/forum/components/Page';

export default class ComposerPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);

    if (!app.session.user) {
      setTimeout(() => app.modal.show(() => import('flarum/forum/components/LogInModal')), 500);
      return m.route.set('/');
    }

    const params = m.route.param();

    m.route.set('/all');

    setTimeout(() => {
      let composerProps = {
        user: app.session.user,
      };

      if (params.content) {
        composerProps.originalContent = params.content;
      }

      // @TODO: Modify this to use lazy loading, checkout https://docs.flarum.org/2.x/extend/code-splitting#async-composers
      app.composer
        .load(() => import('flarum/forum/components/DiscussionComposer'), composerProps)
        .then((DiscussionComposer) => {
          // @TODO: Move all direct access to the module object here. Including subsequent calls to app.composer.show(), checkout https://docs.flarum.org/2.x/extend/code-splitting#async-composers
          app.composer.show();
        });

      if (params.title) {
        app.composer.fields.title(params.title);
      }

      if (params.primary_tag) {
        const tag = app.store.getBy('tags', 'slug', params.primary_tag);

        if (tag) {
          const parent = tag.parent();

          app.composer.fields.tags = parent ? [parent, tag] : [tag];
        }
      }
    }, 0);
  }

  view() {
    return m('div');
  }
}
