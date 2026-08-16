import type Mithril from 'mithril';
import app from 'flarum/forum/app';
import Page, { IPageAttrs } from 'flarum/common/components/Page';
import type Model from 'flarum/common/Model';

/**
 * Minimal shape of a Tag model. The tags extension is an optional runtime
 * dependency, so we avoid importing its typings here.
 */
interface Tag extends Model {
  slug(): string;
  parent(): Tag | null;
}

interface ComposerProps {
  user: NonNullable<typeof app.session.user>;
  originalContent?: string;
}

export default class ComposerPage<CustomAttrs extends IPageAttrs = IPageAttrs> extends Page<CustomAttrs> {
  oninit(vnode: Mithril.Vnode<CustomAttrs, this>) {
    super.oninit(vnode);

    const user = app.session.user;

    if (!user) {
      setTimeout(() => app.modal.show(() => import('flarum/forum/components/LogInModal')), 500);
      return m.route.set('/');
    }

    const params = m.route.param();

    m.route.set('/all');

    setTimeout(() => {
      const composerProps: ComposerProps = {
        user,
      };

      if (params.content) {
        composerProps.originalContent = params.content;
      }

      app.composer
        .load(() => import('flarum/forum/components/DiscussionComposer'), composerProps)
        .then(() => app.composer.show())
        // `fields.title` is created by DiscussionComposer's own `oninit`, which
        // only runs once the body has been mounted. Wait for the editor to be
        // ready before prefilling, otherwise the fields don't exist yet.
        .then(() => app.composer.editorReady())
        .then(() => {
          if (params.title) {
            app.composer.fields.title(params.title);
          }

          if (params.primary_tag) {
            const tag = app.store.getBy<Tag>('tags', 'slug', params.primary_tag);

            if (tag) {
              const parent = tag.parent();

              app.composer.fields.tags = parent ? [parent, tag] : [tag];
            }
          }

          m.redraw();
        });
    }, 0);
  }

  view() {
    return m('div');
  }
}
