chrome.runtime.onMessage.addListener((message: SubmissionType) => {
  if (message.hasOwnProperty('Link')) {
    // Process the data here (e.g., store it or send it elsewhere)
    // console.log('Submission Link:', message.Link);
      // console.log('Adding share link tab');
      setTimeout(() => {
        const shareLinkTab = document.getElementById('sharelink');
        if (!shareLinkTab) {
        document.getElementById('assignmentTabs')?.insertAdjacentHTML(
          'beforeend',
          `
          <li role="none" id="sharelink" class="colored-tab">
              <a role="tab" aria-selected="false" class="tab-link" onclick="event.preventDefault(); navigator.clipboard.writeText('${message.Link}').then(() => { alert('Link copied to clipboard!!!'); }).catch((error) => { alert('Failed to copy link to clipboard:', error); });">
                  <span class="tab-text">Share</span>
              </a>
          </li>
          `
        );}
      }, 1000);
    }
  });
