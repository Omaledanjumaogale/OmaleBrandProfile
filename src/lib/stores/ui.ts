import { writable, derived, get } from 'svelte/store';

export interface Toast {
	id: string;
	type: 'success' | 'error' | 'info' | 'warning';
	title?: string;
	message: string;
	duration?: number;
}

import { toast } from './toast.svelte';

function createUiStore() {
	function addToast(t: Omit<Toast, 'id'>) {
		return toast.add(t);
	}

	function dismissToast(id: string) {
		toast.remove(id);
	}

	function success(message: string, title?: string) {
		return toast.success(message, title);
	}

	function error(message: string, title?: string) {
		return toast.error(message, title);
	}

	function info(message: string, title?: string) {
		return toast.info(message, title);
	}

	function warning(message: string, title?: string) {
		return toast.warning(message, title);
	}

	return { addToast, dismissToast, success, error, info, warning };
}

export const ui = createUiStore();

// ── Service Request Modal (kept here for backward compat) ──────────
export const isServiceModalOpen = writable(false);
export const openServiceModal  = () => isServiceModalOpen.set(true);
export const closeServiceModal = () => isServiceModalOpen.set(false);

// ── Theme Store ────────────────────────────────────────
// Light is the default — matches the CSS :root variables.
function detectInitialTheme(): 'dark' | 'light' {
  if (typeof localStorage === 'undefined') return 'light'; // SSR safe default
  const stored = localStorage.getItem('ewin-theme');
  if (stored === 'light' || stored === 'dark') return stored;
  // Default to light unless user explicitly prefers dark
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function createThemeStore() {
  const _theme = writable<'dark' | 'light'>('light'); // Default: light

  function apply(t: 'dark' | 'light') {
    _theme.set(t);
    if (typeof document !== 'undefined') {
      // Apply theme class to html element — CSS vars respond to html.dark / html.light
      document.documentElement.classList.toggle('dark', t === 'dark');
      document.documentElement.classList.toggle('light', t === 'light');
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('ewin-theme', t);
    }
  }

  function init() {
    apply(detectInitialTheme());
  }

  function toggle() {
    apply(get(_theme) === 'dark' ? 'light' : 'dark');
  }

  function set(t: 'dark' | 'light') { apply(t); }

  const { subscribe } = _theme;
  return { subscribe, toggle, set, init };
}

export const theme = createThemeStore();
