/*eslint no-undef: 0*/

const defaultPreferences = {
  fact: 'history',
  name: 'FirstName LastName'
};

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({preferences: defaultPreferences}, function() {
    console.log('Default preferences syced.');
  });
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'changeFact') {
    chrome.storage.sync.get('preferences', (currentStore)=>{
      const currentPreferences = currentStore.preferences;
      currentPreferences.fact = request.factType;
      chrome.storage.sync.set({preferences: currentPreferences});
      chrome.tabs.reload();
    });
  }
});
