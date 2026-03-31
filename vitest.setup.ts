import '@testing-library/jest-dom/vitest';

if (typeof window !== 'undefined') {
  if (!window.matchMedia) {
    window.matchMedia = (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });
  }

  if (!window.HTMLElement.prototype.scrollIntoView) {
    window.HTMLElement.prototype.scrollIntoView = () => {};
  }
}

if (typeof globalThis !== 'undefined' && !('ResizeObserver' in globalThis)) {
  // Minimal ResizeObserver polyfill for Recharts in tests.
  class MockResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  // @ts-expect-error assigning test polyfill
  globalThis.ResizeObserver = MockResizeObserver;
}
