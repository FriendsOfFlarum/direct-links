import type Mithril from 'mithril';
import Page, { IPageAttrs } from 'flarum/common/components/Page';
export default class ComposerPage<CustomAttrs extends IPageAttrs = IPageAttrs> extends Page<CustomAttrs> {
    oninit(vnode: Mithril.Vnode<CustomAttrs, this>): any;
    view(): any;
}
