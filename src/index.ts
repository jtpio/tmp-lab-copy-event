import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

function encryptText(text: string, key: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode);
  }
  return btoa(result);
}

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'myextension:plugin',
  description: 'A JupyterLab extension that encrypts copied text.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension myextension is activated!');

    const encryptionKey = 'jupyterlab-secret-key';

    document.addEventListener('copy', (e: ClipboardEvent) => {
      const selection = window.getSelection();
      if (selection && selection.toString()) {
        e.preventDefault();

        const text = selection.toString();
        const encryptedText = encryptText(text, encryptionKey);

        e.clipboardData?.setData('text/plain', encryptedText);

        console.log('Text copied and encrypted!');
      }
    });
  }
};

export default plugin;
