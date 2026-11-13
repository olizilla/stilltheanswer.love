// Clipboard helpers shared by the donate section on the home page and /pay.

// Falls back to execCommand where the Clipboard API is unavailable or blocked.
export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.append(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    textarea.remove();
    return copied;
  }
}

// Makes every <button data-copy="text"> copy its text when clicked and show
// "Copied" (or "Copy failed") for 2 seconds. The text is read at click time.
//
// Optional extras, used by /pay:
// - A [data-copy-label] element inside the button is the part that changes,
//   so the rest of the button (e.g. visually hidden text) stays put.
// - data-copy-name="Sort code" is announced to screen readers through an
//   element with id="copy-status" (aria-live), if the page has one.
// - The button gets data-state="copied" or "failed" while the message shows,
//   which Tailwind can style (data-[state=copied]:...).
export function initCopyButtons(root: ParentNode = document) {
  const status = document.getElementById('copy-status');

  root.querySelectorAll<HTMLButtonElement>('button[data-copy]').forEach((button) => {
    const labelEl = button.querySelector<HTMLElement>('[data-copy-label]') ?? button;
    const label = labelEl.textContent;
    let timer: ReturnType<typeof setTimeout> | undefined;

    button.addEventListener('click', async () => {
      const copied = await copyText(button.dataset.copy ?? '');
      labelEl.textContent = copied ? 'Copied' : 'Copy failed';
      button.dataset.state = copied ? 'copied' : 'failed';
      if (status) {
        const name = button.dataset.copyName ?? 'Details';
        status.textContent = copied ? `${name} copied` : `Could not copy ${name.toLowerCase()}`;
      }

      clearTimeout(timer);
      timer = setTimeout(() => {
        labelEl.textContent = label;
        delete button.dataset.state;
        if (status) status.textContent = '';
      }, 2000);
    });
  });
}
