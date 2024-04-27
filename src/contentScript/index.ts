chrome.runtime.onMessage.addListener((message: SubmissionType) => {
  if (message.hasOwnProperty('Link')) {
    // Process the data here (e.g., store it or send it elsewhere)

    if (document.getElementById('sharelink') == null) {
      document.getElementById('assignmentTabs')?.insertAdjacentHTML(
        'beforeend',
        `
        <li role="none" id="sharelink" class="colored-tab">
            <a role="tab" aria-selected="false" class="tab-link" onclick="event.preventDefault(); navigator.clipboard.writeText('${message.Link}').then(() => { alert('Link copied to clipboard!!!'); }).catch((error) => { alert('Failed to copy link to clipboard:', error); });">
                <span class="tab-text">Copy Link</span>
            </a>
        </li>
        `,
      )
    }
  }
})
