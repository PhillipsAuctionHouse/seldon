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

export function isAddToCalendarLoaded(window: Window): boolean {
  return typeof window.addtocalendar !== 'undefined' && typeof window.addtocalendar.load === 'function';
}

export function loadAddToCalendarScript(document: Document, window: Window): Promise<string> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.async = true;
    script.src = `${window.location.protocol === 'https:' ? 'https' : 'http'}://addtocalendar.com/atc/1.5/atc.min.js`;
    script.onload = () => {
      resolve('true');
    };
    script.onerror = () => {
      reject('Failed to load AddToCalendar script');
    };
    document.getElementsByTagName('head')[0].appendChild(script);
  });
}

export function checkAddToCalendarInterval(window: Window): Promise<string> {
  return new Promise((resolve, reject) => {
    let intervalCount = 0;
    const intervalId = setInterval(() => {
      // Store the interval ID
      intervalCount++;
      if (typeof window !== 'undefined' && window.addtocalendar) {
        clearInterval(intervalId); // Use intervalId to clear the interval
        resolve('true');
      } else if (intervalCount >= 10) {
        clearInterval(intervalId); // Use intervalId to clear the interval
        reject('AddToCalendar script failed to load');
      }
    }, 1000);
  });
}

export default function initializeAddToCalendar(): Promise<string> {
  if (isAddToCalendarLoaded(window)) {
    return Promise.resolve('true');
  } else if (typeof window !== 'undefined' && window.ifaddtocalendar === undefined) {
    window.ifaddtocalendar = 1;
    return loadAddToCalendarScript(document, window);
  } else {
    return checkAddToCalendarInterval(window);
  }
}
