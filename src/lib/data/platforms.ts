export type PlatformRecord = {
	slug: string;
	badge: string;
	name: string;
	overview: string;
	category: string;
	status: 'live' | 'prototype' | 'internal';
	icon: string;
	href: string;
	external: boolean;
	prototypePath?: string;
	highlights: string[];
};

export const platforms: PlatformRecord[] = [
	{
		slug: 'ewin-hub',
		badge: 'Headquarters',
		name: 'E-WIN Hub',
		overview: 'The central command platform for the Elite Workforce Impact Nigeria ecosystem, connecting mission, activator programmes, and strategic intelligence.',
		category: 'Ecosystem Core',
		status: 'live',
		icon: '🏢',
		href: 'https://ewinproject.org',
		external: true,
		highlights: ['Mission control', 'Ecosystem coordination', 'Strategic intelligence']
	},
	{
		slug: 'dealxhire',
		badge: 'Marketplace',
		name: 'DealxHire',
		overview: 'A domestic and professional services marketplace connecting vetted providers to clients across Nigeria.',
		category: 'Commerce',
		status: 'live',
		icon: '🛒',
		href: 'https://dealxhire.org',
		external: true,
		highlights: ['Marketplace matching', 'Service delivery workflows', 'National demand aggregation']
	},
	{
		slug: 'akademyx',
		badge: 'Education',
		name: 'AkademyX',
		overview: 'An AI-powered upskilling platform delivering personalised skill development pathways in technology, business, and the digital economy.',
		category: 'Education',
		status: 'prototype',
		icon: '🎓',
		href: '/platforms/akademyx',
		external: false,
		prototypePath: '/prototypes/AkademyxDraft',
		highlights: ['AI learning journeys', 'Digital economy skills', 'Scalable learning design']
	},
	{
		slug: 'alternative-akademyx',
		badge: 'Alternative Education',
		name: 'Alternative AkademyX',
		overview: 'A non-traditional education arm focused on outcomes-based learning with immediate real-world application.',
		category: 'Education',
		status: 'prototype',
		icon: '💡',
		href: '/platforms/alternative-akademyx',
		external: false,
		prototypePath: '/prototypes/AlternativeAkademy',
		highlights: ['Alternative education', 'Outcome-first learning', 'Career acceleration']
	},
	{
		slug: 'profilex',
		badge: 'Personal Branding',
		name: 'ProfileX',
		overview: 'A personal brand and portfolio platform for professionals to showcase expertise, services, and career achievements.',
		category: 'Branding',
		status: 'prototype',
		icon: '👤',
		href: '/platforms/profilex',
		external: false,
		prototypePath: '/prototypes/ProfileX',
		highlights: ['Portfolio experiences', 'Service positioning', 'Digital identity presentation']
	},
	{
		slug: 'iam-network',
		badge: 'Community',
		name: 'I-AM Network',
		overview: 'A decentralised workforce network of trained professionals working across the E-WIN ecosystem with built-in revenue sharing.',
		category: 'Workforce',
		status: 'live',
		icon: '👥',
		href: '/apply',
		external: false,
		highlights: ['Distributed workforce', 'Application flow', 'Income pathway design']
	},
	{
		slug: 'agentlistingx',
		badge: 'Recruitment',
		name: 'AgentListingX',
		overview: 'An intelligent listing and recruitment platform connecting businesses with vetted agents and freelance professionals.',
		category: 'Recruitment',
		status: 'prototype',
		icon: '📋',
		href: '/platforms/agentlistingx',
		external: false,
		prototypePath: '/prototypes/AgentListingX',
		highlights: ['Talent discovery', 'Agent operations', 'B2B matching']
	},
	{
		slug: 'apexmarketer',
		badge: 'Marketing',
		name: 'ApexMarketer',
		overview: 'A digital marketing automation platform providing campaign management, audience analytics, and multi-channel outreach.',
		category: 'Marketing',
		status: 'prototype',
		icon: '📣',
		href: '/platforms/apexmarketer',
		external: false,
		prototypePath: '/prototypes/ApexMarketer',
		highlights: ['Campaign orchestration', 'Audience analytics', 'Growth operations']
	},
	{
		slug: 'biznexense',
		badge: 'Business Intelligence',
		name: 'BizneXense',
		overview: 'An enterprise business intelligence suite delivering real-time dashboards, operational insights, and decision support.',
		category: 'Analytics',
		status: 'prototype',
		icon: '📊',
		href: '/platforms/biznexense',
		external: false,
		prototypePath: '/prototypes/BizneXense',
		highlights: ['Executive dashboards', 'Operational insight', 'Decision support']
	},
	{
		slug: 'biznex-draft',
		badge: 'Business Planning',
		name: 'Biznex Draft',
		overview: 'A strategic business planning experience for building lean canvases and comprehensive plans for emerging market ventures.',
		category: 'Business Operations',
		status: 'prototype',
		icon: '👔',
		href: '/platforms/biznex-draft',
		external: false,
		prototypePath: '/prototypes/BiznexDraft',
		highlights: ['Business planning', 'Lean canvas support', 'Operational modelling']
	},
	{
		slug: 'betxpredicts',
		badge: 'Sports Analysis',
		name: 'BetxPredicts',
		overview: 'A data-driven sports analytics platform for informed prediction and decision support.',
		category: 'Analytics',
		status: 'prototype',
		icon: '⚽',
		href: '/platforms/betxpredicts',
		external: false,
		prototypePath: '/prototypes/BetxPredicts',
		highlights: ['Sports modelling', 'Prediction dashboards', 'Trend analysis']
	},
	{
		slug: 'college-cbt',
		badge: 'Tertiary Education',
		name: 'College CBT',
		overview: 'A scalable computer-based testing platform for higher education institutions.',
		category: 'Education',
		status: 'prototype',
		icon: '🏛️',
		href: '/platforms/college-cbt',
		external: false,
		prototypePath: '/prototypes/CollegeCBT',
		highlights: ['Assessment delivery', 'Institutional workflows', 'Examination scale']
	},
	{
		slug: 'school-cbt',
		badge: 'K-12 Education',
		name: 'School CBT',
		overview: 'A digital assessment platform for primary and secondary schools, modernising how students learn and are evaluated.',
		category: 'Education',
		status: 'prototype',
		icon: '📖',
		href: '/platforms/school-cbt',
		external: false,
		prototypePath: '/prototypes/SchoolCBT',
		highlights: ['K-12 assessments', 'Modern evaluation', 'School operations']
	},
	{
		slug: 'financial-auditor',
		badge: 'Finance',
		name: 'Financial Auditor',
		overview: 'An automated auditing and verification system for transparent economic activity and business compliance.',
		category: 'Finance',
		status: 'prototype',
		icon: '🏦',
		href: '/platforms/financial-auditor',
		external: false,
		prototypePath: '/prototypes/FinancialAuditor',
		highlights: ['Audit automation', 'Compliance insight', 'Financial integrity']
	},
	{
		slug: 'medpharmrx',
		badge: 'Healthcare',
		name: 'MedPharmRx',
		overview: 'A healthcare operations prototype focused on pharmaceutical supply tracking and inventory visibility.',
		category: 'Healthcare',
		status: 'prototype',
		icon: '🩺',
		href: '/platforms/medpharmrx',
		external: false,
		prototypePath: '/prototypes/MedPharmRx',
		highlights: ['Inventory tracking', 'Supply chain visibility', 'Healthcare operations']
	},
	{
		slug: 'mentorme',
		badge: 'Mentorship',
		name: 'MentorMe',
		overview: 'A mentorship network connecting experienced leaders with emerging talent through structured guidance and knowledge transfer.',
		category: 'Community',
		status: 'prototype',
		icon: '🤝',
		href: '/platforms/mentorme',
		external: false,
		prototypePath: '/prototypes/MentorMe',
		highlights: ['Mentorship programmes', 'Talent development', 'Knowledge transfer']
	},
	{
		slug: 'marketintel',
		badge: 'Market Intelligence',
		name: 'MarketIntel',
		overview: 'A real-time market intelligence concept for commodities, forex, and emerging market decision support.',
		category: 'Analytics',
		status: 'prototype',
		icon: '📈',
		href: '/platforms/marketintel',
		external: false,
		prototypePath: '/prototypes/MarketIntel',
		highlights: ['Market signals', 'Trade insight', 'Real-time intelligence']
	},
	{
		slug: 'newstrade',
		badge: 'Media',
		name: 'NewsTrade',
		overview: 'A market news and economic reporting prototype focused on the African trade sector.',
		category: 'Media',
		status: 'prototype',
		icon: '📰',
		href: '/platforms/newstrade',
		external: false,
		prototypePath: '/prototypes/NewsTrade',
		highlights: ['Economic coverage', 'Trade reporting', 'Insight distribution']
	},
	{
		slug: 'insightstrade',
		badge: 'Commerce',
		name: 'InsightsTrade',
		overview: 'A commerce and marketplace prototype within the E-WIN ecosystem for vendor and buyer coordination.',
		category: 'Commerce',
		status: 'prototype',
		icon: '📦',
		href: '/platforms/insightstrade',
		external: false,
		prototypePath: '/prototypes/InsightsTrade',
		highlights: ['Marketplace concept', 'Vendor coordination', 'Secure transactions']
	},
	{
		slug: 'vantagepoint',
		badge: 'Strategy',
		name: 'VantagePoint',
		overview: 'A strategic insight and data visualisation concept for ecosystem-wide performance monitoring.',
		category: 'Strategy',
		status: 'prototype',
		icon: '🔭',
		href: '/platforms/vantagepoint',
		external: false,
		prototypePath: '/prototypes/VantagePoint',
		highlights: ['Leadership reporting', 'Performance visibility', 'Strategic planning']
	}
];

export const platformMap = new Map(platforms.map((platform) => [platform.slug, platform]));
