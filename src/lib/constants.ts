// ── UI Status Color Maps ─────────────────────────────────────────────────────

export const APPLICATION_STATUS_COLORS: Record<string, string> = {
	approved: 'text-[var(--teal2)] bg-[var(--teal2)]/10 border-[var(--teal2)]/30',
	pending: 'text-[var(--gold)] bg-[var(--gold-dim)] border-[var(--gold-line)]',
	declined: 'text-red-400 bg-red-400/10 border-red-400/30'
};

export const REQUEST_STATUS_COLORS: Record<string, string> = {
	completed: 'text-[var(--teal2)] bg-[var(--teal2)]/10 border-[var(--teal2)]/30',
	contacted: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
	pending: 'text-[var(--gold)] bg-[var(--gold-dim)] border-[var(--gold-line)]',
	archived: 'text-[var(--muted)] bg-[var(--surface3)] border-[var(--border)]'
};

export const TASK_STATUS_COLORS: Record<string, string> = {
	pending: 'text-[var(--muted)] bg-[var(--surface3)] border-transparent',
	in_progress: 'text-[var(--gold)] bg-[var(--gold-dim)] border-[var(--gold-line)]',
	submitted: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
	completed: 'text-[var(--teal2)] bg-[var(--teal2)]/10 border-[var(--teal2)]/30'
};

export const USER_STATUS_COLORS: Record<string, string> = {
	active: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
	suspended: 'text-red-400 bg-red-400/10 border-red-400/20',
	pending: 'text-gold bg-gold/10 border-gold/20'
};

// ── TypeScript Types ────────────────────────────────────────────────────────

export interface UserData {
	_id?: string;
	name: string;
	email: string;
	role: 'user' | 'admin';
	trustScore: number;
	lastLogin: number;
	isLocked?: boolean;
	status?: 'active' | 'suspended' | 'pending';
	image?: string;
}

export interface ApplicationData {
	_id?: string;
	fullName: string;
	email: string;
	mobileNumber: string;
	whatsappNumber: string;
	stateOfOrigin: string;
	lgaOfOrigin: string;
	stateOfResidence: string;
	lgaOfResidence: string;
	nin: string;
	academicBackground: string;
	workingExperience: string;
	skills: string;
	motivationalStatement: string;
	monthlyEarningsTarget: string;
	status: 'pending' | 'approved' | 'declined';
	createdAt: number;
	updatedAt?: number;
	assignedTasks?: string[];
	reviewedBy?: string;
}

export interface ServiceRequestData {
	_id?: string;
	fullName: string;
	email: string;
	whatsappNumber: string;
	mobileNumber: string;
	address: string;
	stateOfResidence: string;
	lgaOfResidence: string;
	serviceType: string;
	budget: string;
	description: string;
	company?: string;
	bestTimeToReach: string;
	urgency: string;
	preferredCommunication: string;
	needType: string;
	status: 'pending' | 'contacted' | 'completed' | 'archived';
	createdAt: number;
	updatedAt?: number;
}

export interface TaskData {
	_id?: string;
	assigneeId: string;
	title: string;
	description: string;
	deadline: number;
	status: 'pending' | 'in_progress' | 'submitted' | 'completed';
	report?: string;
	createdAt: number;
}

export interface BroadcastData {
	_id?: string;
	message: string;
	sender: string;
	timestamp: number;
}

export interface AuditLogData {
	_id?: string;
	action: string;
	payload: any;
	timestamp: number;
	adminEmail?: string;
}

export interface MetricsData {
	_id?: string;
	userId: string;
	totalEarnings: string;
	activeProjects: number;
	courseProgress: number;
	updatedAt: number;
}
