// Because we're not allowed to export non-default exports from our components (otherwise we break HotModuleReplacement of react/refresh)
// We'll need to export any helper functions from this file
// React/refresh documentation on the issue:
// https://github.com/vitejs/vite/discussions/4583#discussioncomment-1802717
// Because we're not allowed to export non-default exports from our components (otherwise we break HotModuleReplacement of react/refresh)
// We'll need to export any helper functions from this file
// React/refresh documentation on the issue:
// https://github.com/vitejs/vite/discussions/4583#discussioncomment-1802717

declare global {
  interface Window {
    addtocalendar: {
      load: () => void;
    };

    ifaddtocalendar: number | undefined;
  }
}

export default function initializeAddToCalendar(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && window.addtocalendar) {
      if (typeof window.addtocalendar.load === 'function') {
        resolve('true');
      }
    } else {
      let intervalCount = 0;
      if (typeof window !== 'undefined' && window.ifaddtocalendar === undefined) {
        window.ifaddtocalendar = 1;
        const d = document;
        const s = d.createElement('script');
        const g = 'getElementsByTagName';
        s.type = 'text/javascript';
        s.charset = 'UTF-8';
        s.async = true;
        s.src = `${window.location.protocol === 'https:' ? 'https' : 'http'}://addtocalendar.com/atc/1.5/atc.min.js`;
        s.onload = () => {
          resolve('true');
        };
        s.onerror = () => {
          reject('Failed to load AddToCalendar script');
        };
        d[g]('head')[0].appendChild(s);
      } else {
        const checkInterval = setInterval(() => {
          intervalCount++;
          if (typeof window !== 'undefined' && window.addtocalendar) {
            clearInterval(checkInterval);
            resolve('true');
          } else if (intervalCount >= 10) {
            clearInterval(checkInterval);
            reject('AddToCalendar script failed to load');
          }
        }, 1000);
      }
    }
  });
}
