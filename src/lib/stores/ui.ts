import { writable, derived, get } from 'svelte/store';

export interface Toast {
	id: string;
	type: 'success' | 'error' | 'info' | 'warning';
	title?: string;
	message: string;
	duration?: number;
}

function createUiStore() {
	const toasts = writable<Toast[]>([]);

	function addToast(toast: Omit<Toast, 'id'>): string {
		const id = crypto.randomUUID();
		const entry: Toast = { id, duration: 4000, ...toast };
		toasts.update((t) => [...t, entry]);
		// Auto dismiss
		if (entry.duration && entry.duration > 0) {
			setTimeout(() => dismissToast(id), entry.duration);
		}
		return id;
	}

	function dismissToast(id: string) {
		toasts.update((t) => t.filter((x) => x.id !== id));
	}

	function success(message: string, title?: string) {
		return addToast({ type: 'success', message, title });
	}

	function error(message: string, title?: string) {
		return addToast({ type: 'error', message, title, duration: 6000 });
	}

	function info(message: string, title?: string) {
		return addToast({ type: 'info', message, title });
	}

	function warning(message: string, title?: string) {
		return addToast({ type: 'warning', message, title });
	}

	const { subscribe } = derived(toasts, ($t) => ({ toasts: $t }));

	return { subscribe, addToast, dismissToast, success, error, info, warning };
}

export const ui = createUiStore();

// ── Service Request Modal (kept here for backward compat) ──────────
export const isServiceModalOpen = writable(false);
export const openServiceModal  = () => isServiceModalOpen.set(true);
export const closeServiceModal = () => isServiceModalOpen.set(false);

// ── Theme Store ────────────────────────────────────────
function detectInitialTheme(): 'dark' | 'light' {
  if (typeof localStorage === 'undefined') return 'dark';
  const stored = localStorage.getItem('ewin-theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function createThemeStore() {
  const _theme = writable<'dark' | 'light'>('dark');

  function apply(t: 'dark' | 'light') {
    _theme.set(t);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('light', t === 'light');
      document.documentElement.classList.toggle('dark', t === 'dark');
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
