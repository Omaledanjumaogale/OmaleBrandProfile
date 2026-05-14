/**
 * Global Reactive Toasts (toast.svelte.ts)
 * Unified notification system leveraging Svelte 5 Runes for reactive state management.
 * Strictly handles notification overlays and respects semantic accessibility.
 */

export interface Toast {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    title?: string;
    message: string;
    duration: number;
}

class ToastStore {
    // Rune for reactive array of toasts
    toasts = $state<Toast[]>([]);

    add(toast: Omit<Toast, 'id' | 'duration'> & { duration?: number }) {
        const id = crypto.randomUUID();
        const duration = toast.duration ?? 4000;
        
        const newToast: Toast = {
            id,
            duration,
            type: toast.type,
            title: toast.title,
            message: toast.message
        };

        this.toasts.push(newToast);

        if (duration > 0) {
            setTimeout(() => this.remove(id), duration);
        }

        return id;
    }

    remove(id: string) {
        this.toasts = this.toasts.filter(t => t.id !== id);
    }

    // Shorthand helpers
    success(message: string, title?: string) {
        return this.add({ type: 'success', message, title });
    }

    error(message: string, title?: string) {
        return this.add({ type: 'error', message, title, duration: 6000 });
    }

    info(message: string, title?: string) {
        return this.add({ type: 'info', message, title });
    }

    warning(message: string, title?: string) {
        return this.add({ type: 'warning', message, title });
    }
}

// Single reactive instance
export const toast = new ToastStore();
