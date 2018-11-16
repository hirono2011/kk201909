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
      'kk-package:toggle': () => this.toggle(),
      'kk-package:copylinetweet': () => this.copylinetweet(),
      'kk-package:linecopy': () => this.linecopy()
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
      //window.alert("It's Time!");
      // var editor = atom.workspace.getActiveTextEditor()
      // editor.cut-to-end-of-buffer-line
      // editor.select-line-copy

  },

  copylinetweet() {
      // window.alert("It's Time!");
      var editor = atom.workspace.getActiveTextEditor();
      // editor:cut-to-end-of-buffer-line
      // editor:select-line-copy
      // var str = "よろしくです";
      // editor.insertText(str);
      editor.moveToBeginningOfLine();
      editor.selectToEndOfLine();
      editor.copySelectedText();
      //editor.moveToBeginningOfLine();
      editor.moveToEndOfLine();

      var text = atom.clipboard.read();
      var COMMAND = "h-kk_hirono-arg-tweet.rb";
      // var COMMAND = `h-kk_hirono-arg-tweet.rb ${text}`;
      var exec = require('child_process').exec;

      exec(COMMAND, function(error, stdout, stderr) {
        // シェル上でコマンドを実行できなかった場合のエラー処理
        if (error !== null) {
          console.log('exec error: ' + error);
          return;
        }

        // シェル上で実行したコマンドの標準出力が stdout に格納されている console.log('stdout: ' + stdout);
      });
  },

  linecopy() {
      var ed = atom.workspace.getActiveTextEditor();
      ed.moveToBeginningOfLine();
      ed.selectToEndOfLine();
      ed.copySelectedText();
      ed.moveToEndOfLine();
  }
};

// シェル上で実行するコマンド
//var COMMAND = 'echo Hello World';
// var text = atom.clipboard.read();
// var text = "黒い魔法追加位"
// var COMMAND = "/home/a66/local-bin/h-kk_hirono-arg-tweet.rb";
// // var COMMAND = `h-kk_hirono-arg-tweet.rb ${text}`;
// var exec = require('child_process').exec;
//
// exec(COMMAND, function(error, stdout, stderr) {
//   // シェル上でコマンドを実行できなかった場合のエラー処理
//   if (error !== null) {
//     console.log('exec error: ' + error);
//     return;
//   }
//
//   // シェル上で実行したコマンドの標準出力が stdout に格納されている
//   console.log('stdout: ' + stdout);
// });
