console.log('background is running');

chrome.webRequest.onSendHeaders.addListener(
  (details) => {
    const refererHeader = details.requestHeaders?.find((header) => header.name === 'Referer');
    const referer = refererHeader?.value?.replace('submit', 'review') || '';
    const url = new URL(details.url);
    const submissionId = url.searchParams.get('peerSubmissionId')?.split('~')[2] || '';

    if (details.url.includes('onDemandPeer') && submissionId && referer) {
      let submissionLink = '';
      if (!referer.includes(submissionId)) {
        submissionLink = `${referer}/${submissionId}`;
      } else if (!referer.includes("/review")) {
        submissionLink = `${referer}/review/${submissionId}`;
      }

      const data: SubmissionType = {
        Link: submissionLink || referer,
      };

      // Send data to the content script of the current tab
      chrome.tabs.sendMessage(details.tabId, data);
    }
  },
  { urls: ['<all_urls>'] },
  ['requestHeaders', 'extraHeaders']
);
