chrome.runtime.onStartup.addListener(function() {
});
chrome.webRequest.onBeforeRequest.addListener(
  function(details) { 
    console.log(details);
    countAds();
    return {cancel: true}; 
  },
  {urls: 
    ["*://*.doubleclick.net/*",
    "*://*.googleadservices.com/*",
    "*://*.googlesyndication.com/*",
    "*://*.moat.com/*"]
  },
  ["blocking"]
);
function countAds() {
  ads = 0;
  chrome.storage.get('adsBlocked', function(result){
    ads = result.adsBlocked;
  });
  ads += 1;
  chrome.storage.set({adsBlocked: ads}, function() {
    console.log('Ad Blocked');
  });
}
