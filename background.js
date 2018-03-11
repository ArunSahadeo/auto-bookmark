window.onload = bookmarkAction;

function bookmarkAction()
{

    chrome.runtime.onMessage.addListener
    (
        function(message, sender, sendResponse)
        {
            if (message.bookmark == "true")
            {
                chrome.tabs.query
                ({
                    title: message.pageTitle, 
                }, function(tabArr)
                {
                    if (tabArr.length < 1) return;

                    var targetTab = tabArr[0] || false;

                    if (!targetTab) return;

                    chrome.bookmarks.create
                    (
                        {
                            'parentId': '1',
                            'title': targetTab.title,
                            'url': targetTab.url
                        }
                    );


                });
                sendResponse({has_bookmarked: 'It has been bookmarked'});
            }
        }
    );

}
