'use babel';

import KkPackageView from './kk-package-view';
import { CompositeDisposable } from 'atom';

export default {

  kkPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.kkPackageView = new KkPackageView(state.kkPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.kkPackageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'kk-package:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.kkPackageView.destroy();
  },

  serialize() {
    return {
      kkPackageViewState: this.kkPackageView.serialize()
    };
  },

  toggle() {
    console.log('KkPackage was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
