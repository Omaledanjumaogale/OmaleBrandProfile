export interface InsightPost {
	slug: string;
	tag: string;
	title: string;
	date: string;
	excerpt: string;
	content: string;
	image?: string;
	readTime: string;
	author: string;
}

export const insights: InsightPost[] = [
	{
		slug: 'the-agentic-shift',
		tag: 'Featured Essay ✍️',
		title: 'The Agentic Shift: Why the Next Decade Belongs to AI-Augmented Founders 🤖',
		date: 'May 12, 2026',
		readTime: '8 min read',
		author: 'Omale Danjuma Ogale',
		excerpt: 'We are entering the most significant redistribution of productive capacity in human history. AI agents are not tools — they are leverage.',
		content: `
			<p>We are entering the most significant redistribution of productive capacity in human history. AI agents are not tools — they are leverage. And founders who learn to orchestrate them will operate at the velocity of entire teams.</p>
			<p>For the past decade, "scaling" meant hiring. The next decade, scaling will mean architecting. The bottleneck for production is shifting from human labor to cognitive orchestration.</p>
			<h3>The Orchestrator Advantage</h3>
			<p>In this new era, the founder acts as an orchestrator. Instead of doing the work, or even managing humans doing the work, the founder designs the systems that allow autonomous agents to execute at scale.</p>
			<p>This isn't just about efficiency; it's about agency. The ability to move from idea to execution without the friction of traditional organizational structures.</p>
		`
	},
	{
		slug: 'emerging-markets-ai-gap',
		tag: 'Analysis 📊',
		title: 'Emerging Markets & The AI Access Gap 🌍',
		date: 'May 10, 2026',
		readTime: '6 min read',
		author: 'Omale Danjuma Ogale',
		excerpt: 'The democratisation of AI is uneven. Without intentional infrastructure investment, the gap between AI-enabled and AI-excluded economies will widen.',
		content: `
			<p>The democratisation of AI is uneven. Without intentional infrastructure investment and localised model training, the gap between AI-enabled and AI-excluded economies will widen dramatically by 2030.</p>
			<p>Approximately 26% of jobs in low-income countries are already exposed to AI displacement, yet these same regions often lack the compute resources or data sovereignty to build their own solutions.</p>
		`
	},
	{
		slug: 'building-for-dignity',
		tag: 'Framework 🏗️',
		title: 'Building for Dignity: A Sociological Framework for Ethical AI Product Design ⚖️',
		date: 'May 05, 2026',
		readTime: '10 min read',
		author: 'Omale Danjuma Ogale',
		excerpt: 'Ethical AI is not about compliance checklists. It is about designing systems that preserve human dignity and expand agency.',
		content: `
			<p>Ethical AI is not about compliance checklists. It is about designing systems that preserve human dignity, expand agency, and distribute value fairly across all users — not just the most profitable segment.</p>
			<p>When we build, we must ask: Does this system empower the user, or does it merely extract from them? Does it foster community, or isolation?</p>
		`
	}
];
