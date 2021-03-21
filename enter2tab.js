/* 
    This will emulate a tab keypress when enter is pressed on anything with the 
    class enter2tab. 
    Just include this javascript in your head
*/

// Attach the simulateTab to anything witht he class enter2tab.
document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('.enter2tab').forEach((node) => {
    node.addEventListener('keydown', (e) => {
      if (13 === e.keyCode) {
        e.preventDefault();
        simulateTab.call(node);
      }
    });
  });
});

// This will try to emulate the behavior of a tabpress by giving the
// next object focus
function simulateTab() {
  obj = this;
  let found = false;
  let end = false;
  while (found === false && end === false) {
    if (obj.firstChild) {
      obj = obj.firstChild;
    } else if (obj.nextSibling) {
      obj = obj.nextSibling;
    } else if (obj.parentNode && obj.parentNode.nextSibling) {
      obj = obj.parentNode.nextSibling;
    } else {
      end = true;
    }
    if (obj && obj.contentEditable === 'true') found = true;
    if (obj && (obj.tagName === 'INPUT' || obj.tagName === 'TEXTAREA' || obj.tagName === 'A' || obj.tagName === 'AUDIO' || obj.tagName === 'VIDEO' || obj.tagName === 'SELECT')) found = true;
    if (found) {
      // tab don't stop on hidden objects
      if (obj.style.display === 'none') found = false;
    }
  }
  if (found) {
    obj.focus();
    // if the obj accept text input, move the cursor to the end.
    // This is not standard tab behavior, but should be.
    if (obj.contentEditable === 'true' || obj.tagName === 'INPUT' || obj.tagName === 'TEXTAREA') {
      commandEOL.call(obj);
    }
  }
}

// Move the cursor to the end of the line.
function commandEOL() {
  // for div and span
  if (this.childNodes.length > 0) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.setStart(this.lastChild, this.lastChild.length);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  if (obj.tagName === 'INPUT' || obj.tagName === 'TEXTAREA') {
    this.selectionStart = this.selectionEnd = this.value.length;
  }
}
