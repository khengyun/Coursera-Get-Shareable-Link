// share link
chrome.webRequest.onSendHeaders.addListener(
  (details) => {
    const { requestHeaders = [], url, tabId } = details;
    const refererHeader = requestHeaders.find?.((header) => header.name === 'Referer');
    const { value: referer = '' } = refererHeader || {};
    const { searchParams } = new URL(url);
    const submissionId = searchParams.get('peerSubmissionId')?.split('~')[2] || '';
    const refererURL = referer.replace(/\/submit$/, '/review')

    if (url.includes('onDemandPeer') && submissionId && refererURL) {
      let submissionLink = '';

      switch (true) {
        case !refererURL.endsWith(submissionId) && refererURL.endsWith("/review"):
          submissionLink = `${refererURL}/${submissionId}`;
          break;
        case !refererURL.includes(submissionId) && !refererURL.includes("/review"):
          submissionLink = `${refererURL}/review/${submissionId}`;
          break;
      }

      const data: SubmissionType = {
        Link: submissionLink || refererURL,
      };

      // console.log('Submission Link:', data.Link);

      // Send data to the content script of the current tab
      chrome.tabs.sendMessage(tabId, data);
    }
  },
  { urls: ['<all_urls>'] },
  ['requestHeaders', 'extraHeaders']
);
