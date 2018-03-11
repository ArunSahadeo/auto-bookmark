window.onload = init;

function init()
{
    function retrieve_search_terms()
    {

        var bodyText = String(document.body.innerText).toLowerCase(),
            pageTitle = String(document.title),
            metaElems = document.getElementsByTagName('meta'),
            hitCount = 0;

        chrome.storage.sync.get({
            searchTerms: []
        }, function(data)
        {
            var length = data.searchTerms.length,
                searchTerms = data.searchTerms;
            for (var i = 0; i < length; i++)
            {
                var searchTerm = String(searchTerms[i]).toLowerCase(),
                    metaContent = String(metaElems[i].getAttribute('content')).toLowerCase(),
                    pageTitleLC = String(pageTitle).toLowerCase();
                if ( bodyText.indexOf(searchTerm) > -1 || pageTitleLC.indexOf(searchTerm) > -1 || metaContent.indexOf(searchTerm) > -1 ) hitCount ++;
            }

            if (hitCount > 0)
            {
                chrome.runtime.sendMessage({bookmark: 'true', pageTitle: pageTitle}, function(response)
                {
                    console.log(response.has_bookmarked);
                });
            }
        });
    }

    retrieve_search_terms();
}
