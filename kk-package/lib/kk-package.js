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
      'kk-package:linecopy': () => this.linecopy(),
      'kk-package:getTweet': () => this.getTweet()
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
      window.alert("It's Time!");
      // var editor = atom.workspace.getActiveTextEditor()
      // editor.cut-to-end-of-buffer-line
      // editor.select-line-copy

  },

  copylinetweet() {
      // window.alert("It's Time!");
      var orgEditor = atom.workspace.getActiveTextEditor();
      // orgEditor.moveToBeginningOfLine();
      // orgEditor.selectToEndOfLine();
      // orgEditor.copySelectedText();
      orgEditor.moveToBeginningOfLine();
      const d1 = new Date();
          while (true) {
            const d2 = new Date();
            if (d2 - d1 > 1000) {
              break;
            }
          }
      orgEditor.moveToEndOfLine();
// alert(orgEditor.getCursorBufferPositions());
      //var text = atom.clipboard.read();
      point = orgEditor.getCursorBufferPosition()
      var text = orgEditor.lineTextForBufferRow(point.row);
      var fs = require('fs');

      //ファイルの書き込み関数
      function writeFile(path, data) {
        fs.writeFile(path, data, function (err) {
          if (err) {
              throw err;
          }
        });
      }

      //使用例
      writeFile("/home/a66/tmp/js.txt", text);
      //alert(text)

      //var COMMAND = "h-kk_hirono-arg-tweet.rb";
      var COMMAND = "h-kk_hirono-line-twit_file-js.rb";
      var exec = require('child_process').exec;

      exec(COMMAND, function(error, stdout, stderr) {
        // シェル上でコマンドを実行できなかった場合のエラー処理
        if (error !== null) {
          console.log('exec error: ' + error);
          return;
        }

        // シェル上で実行したコマンドの標準出力が stdout に格納されている console.log('stdout: ' + stdout);
      });

      option = {
        detail: text
        //dismissable: true  //右端にバッテンが表示され自動で消えなくなる
        // icon: null
      }
      atom.notifications.addSuccess("Success LineCount: " + text.length, option)
      // atom.notifications.addInfo("Info")
      // atom.notifications.addWarning("Warning", option)
      // atom.notifications.addError("Error")
      // atom.notifications.addFatalError("FatalError")

  },

  linecopy() {
      var ed = atom.workspace.getActiveTextEditor();
      ed.moveToBeginningOfLine();
      ed.selectToEndOfLine();
      ed.copySelectedText();
      ed.moveToEndOfLine();
      var cnt = ed.getLineCount();
      var point = ed.getCursorBufferPosition()
      var text = ed.lineTextForBufferRow(point.row);
      atom.notifications.addSuccess("LINE: " + text.length);
  },

  getTweet() {
    const execSync = require('child_process').execSync;
    const result =  execSync('hb-line-api-twitter.rb -w').toString();
    var getTweetEditor = atom.workspace.getActiveTextEditor();
    getTweetEditor.insertText(result);
//    atom.workspace.observeTextEditors(editor => {
//     editor.insertText('Hello World')
// })Hello World
  }

  // lineCnt() {
  //     var edline = atom.workspace.getActiveTextEditor();
  //
  //     edline.moveToEndOfLine();
  //     var point = edline.getCursorBufferPosition()
  //     var text = edline.lineTextForBufferRow(point.row);
  //     atom.notifications.addSuccess("LINE: " + text.length);
  // }
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
