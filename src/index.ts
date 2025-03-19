import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'myextension:plugin',
  description: 'A JupyterLab extension that encrypts copied text.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension myextension is activated!');

    const encryptText = async (text: string): Promise<string> => {
      await new Promise(resolve => setTimeout(resolve, 100));
      return text.split('').reverse().join('');
    };

    document.body.addEventListener(
      'copy',
      async (e: ClipboardEvent) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        console.log('Intercepted copy event');

        // Get the selected text
        const selection = document.getSelection();
        const originalText = selection?.toString() || '';

        // Process text asynchronously using await
        const encryptedText = await encryptText(originalText);

        // Set the processed text to clipboard
        e.clipboardData?.setData('text/plain', encryptedText);

        console.log('Original:', originalText);
        console.log('Encrypted:', encryptedText);
      },
      true
    );
  }
};

export default plugin;
