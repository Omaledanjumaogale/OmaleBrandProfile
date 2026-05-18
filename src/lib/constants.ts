// ── UI Status Color Maps ─────────────────────────────────────────────────────

export const APPLICATION_STATUS_COLORS: Record<string, string> = {
	approved: 'text-teal2 bg-teal2/10 border-teal2/30',
	pending:  'text-gold  bg-gold/10  border-gold/30',
	declined: 'text-red-500 bg-red-500/10 border-red-500/30'
};

export const REQUEST_STATUS_COLORS: Record<string, string> = {
	completed: 'text-teal2 bg-teal2/10 border-teal2/30',
	contacted: 'text-blue-500 bg-blue-500/10 border-blue-500/30',
	pending:   'text-gold  bg-gold/10  border-gold/30',
	archived:  'text-muted bg-surface3 border-border'
};

export const TASK_STATUS_COLORS: Record<string, string> = {
	pending:     'text-muted   bg-surface3 border-transparent',
	in_progress: 'text-gold    bg-gold/10  border-gold/30',
	submitted:   'text-blue-500 bg-blue-500/10 border-blue-500/30',
	completed:   'text-teal2   bg-teal2/10 border-teal2/30'
};

export const USER_STATUS_COLORS: Record<string, string> = {
	active:    'text-teal2 bg-teal2/10 border-teal2/20',
	suspended: 'text-red-500 bg-red-500/10 border-red-500/20',
	pending:   'text-gold bg-gold/10 border-gold/20'
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
