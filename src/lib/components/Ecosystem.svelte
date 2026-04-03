<script lang="ts">
	const platforms = [
		{
			badge: 'Headquarters 🏢',
			name: 'E-WIN Hub 🌍',
			overview: 'The central command platform for the Elite Workforce Impact Nigeria ecosystem — housing the mission, activator programmes, I-AM Network portal, and strategic intelligence for all sub-platforms.',
			link: 'Explore Platform →',
			domain: 'ewinproject.org',
			href: 'https://ewinproject.org',
			icon: '🏢'
		},
		{
			badge: 'Marketplace 🛒',
			name: 'DealxHire 🤝',
			overview: 'A domestic and professional services marketplace connecting vetted service providers to clients across Nigeria. The centralized hub for E-Deals mobile application platform — arbitraging supply and demand at scale.',
			link: 'Explore Platform →',
			domain: 'dealxhire.org',
			href: 'https://dealxhire.org',
			icon: '🛒'
		},
		{
			badge: 'Education 🎓',
			name: 'AkademyX 🧠',
			overview: 'An AI-powered upskilling and decentralised education platform delivering hyper-personalised skill development pathways in tech, business, and the digital economy — closing the knowledge gap for ambitious learners across Africa.',
			link: 'Explore Platform →',
			domain: 'akademyx.org',
			href: 'https://akademyx.org',
			icon: '🎓'
		},
		{
			badge: 'Alternative Ed 💡',
			name: 'Alt AkademyX 🚀',
			overview: 'The alternative education arm — offering non-traditional, outcomes-focused learning experiences that challenge conventional academic pathways and deliver real-world skills with immediate economic application.',
			link: 'Explore Platform →',
			domain: 'alternativeakademyx.org',
			href: 'https://alternativeakademyx.org',
			icon: '💡'
		},
		{
			badge: 'Community 👥',
			name: 'I-AM Network 🌍',
			overview: 'The Impact Ambassador Network — a decentralised workforce of vetted, trained professionals performing distributed work across the E-WIN ecosystem. Collaborative networking with distributive revenue sharing built in.',
			link: 'Join Network →',
			domain: 'Join I-AM 🚀',
			href: '/register/iam',
			icon: '👥'
		},
		{
			badge: 'Intelligence 🧠',
			name: 'DEALS Platform 📊',
			overview: 'Digital Emerging Arbitrage and Leverage Services — the technological backbone of the E-WIN revenue model, powering white-label freelance marketplaces, service arbitrage, and the done-for-you business infrastructure for the ecosystem.',
			link: 'Explore Platform →',
			domain: 'DEALS · E-WIN 💼',
			href: '#',
			icon: '📈'
		},
		{
			badge: 'Learning 📚',
			name: 'AkademyX Draft 🎓',
			overview: 'AI-powered lesson structures and interactive educational content for the E-WIN ecosystem.',
			link: 'Open Draft →',
			domain: 'AkademyX · E-WIN',
			href: '/platforms/AkademyxDraft.html',
			icon: '🎓'
		},
		{
			badge: 'Analysis ⚽',
			name: 'BetxPredicts 📈',
			overview: 'Data-driven sports predictions and analytical modeling for informed decision making.',
			link: 'Open Platform →',
			domain: 'BetxPredicts · E-WIN',
			href: '/platforms/BetxPredicts.html',
			icon: '📈'
		},
		{
			badge: 'Business 👔',
			name: 'Biznex Draft 💼',
			overview: 'Strategic business planning and operational modeling for emerging market enterprises.',
			link: 'Open Draft →',
			domain: 'Biznex · E-WIN',
			href: '/platforms/BiznexDraft.html',
			icon: '👔'
		},
		{
			badge: 'Tertiary Ed 🏛️',
			name: 'College CBT 🏫',
			overview: 'Advanced computer-based testing infrastructure for higher education institutions.',
			link: 'Open Platform →',
			domain: 'CollegeCBT · E-WIN',
			href: '/platforms/CollegeCBT.html',
			icon: '🏛️'
		},
		{
			badge: 'Finance 🏦',
			name: 'Financial Auditor 💰',
			overview: 'Automated financial auditing and verification systems for transparent economic activity.',
			link: 'Open Platform →',
			domain: 'Auditor · E-WIN',
			href: '/platforms/FinancialAuditor.html',
			icon: '🏦'
		},
		{
			badge: 'Healthcare 🩺',
			name: 'MedPharmRx 💊',
			overview: 'Pharmaceutical supply chain tracking and medical inventory management solutions.',
			link: 'Open Platform →',
			domain: 'MedPharm · E-WIN',
			href: '/platforms/MedPharmRx.html',
			icon: '🩺'
		},
		{
			badge: 'Mentorship 🤝',
			name: 'MentorMe 🤝',
			overview: 'Peer-to-peer professional mentorship network connecting experienced leaders with emerging talent.',
			link: 'Open Network →',
			domain: 'MentorMe · E-WIN',
			href: '/platforms/MentorMe.html',
			icon: '🤝'
		},
		{
			badge: 'K-12 Ed 📖',
			name: 'School CBT 🎒',
			overview: 'Computer-based testing and digital assessment platform for primary and secondary schools.',
			link: 'Open Platform →',
			domain: 'SchoolCBT · E-WIN',
			href: '/platforms/SchoolCBT.html',
			icon: '📖'
		},
		{
			badge: 'Media 📻',
			name: 'TradexNews 📰',
			overview: 'Real-time market news, economic analysis, and financial reporting for the African trade sector.',
			link: 'Read News →',
			domain: 'TradexNews · E-WIN',
			href: '/platforms/TradexNews.html',
			icon: '📻'
		},
		{
			badge: 'Commerce 📦',
			name: 'TradezMarket 🏪',
			overview: 'Decentralized marketplace for physical and digital goods, powered by the E-WIN infrastructure.',
			link: 'Shop Market →',
			domain: 'Tradez · E-WIN',
			href: '/platforms/TradezMarket.html',
			icon: '📦'
		},
		{
			badge: 'Strategy 🎯',
			name: 'VantagePoint 🔭',
			overview: 'High-level strategic insights and data visualization for ecosystem-wide performance monitoring.',
			link: 'View Insights →',
			domain: 'Vantage · E-WIN',
			href: '/platforms/VantagePoint.html',
			icon: '🎯'
		}
	];
</script>

<section id="ecosystem" class="bg-bg px-6 lg:px-12 py-20">
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-14">
		<div class="reveal">
			<div
				class="font-['Space_Mono'] text-sm md:text-[10px] tracking-[3px] uppercase text-gold mb-[14px] flex items-center gap-[10px]"
			>
				<span class="w-6 h-[1px] bg-gold"></span> E-WIN Ecosystem 🌍
			</div>
			<h2 class="font-['Bebas_Neue'] text-[clamp(36px,5vw,72px)] tracking-[1px] leading-[0.95] mb-6">
				Seventeen platforms.<br />One mission.
			</h2>
		</div>
		<div class="text-sm md:text-[15px] leading-[1.8] text-muted2 font-light reveal delay-100">
			<p>
				The E-WIN Project is an interconnected ecosystem of digital platforms united by a single conviction: that <strong>Africa's workforce gap is solvable</strong> — not through charity, but through intelligent, scalable systems built by Africans for Africans. 🌍<br /><br />Tagline: <strong>Learn. Work. Earn. 💰</strong>
			</p>
		</div>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
		{#each platforms as platform, i}
			<a
				href={platform.href}
				target={platform.href.startsWith('http') ? '_blank' : ''}
				rel={platform.href.startsWith('http') ? 'noopener noreferrer' : ''}
				data-sveltekit-reload={(!platform.href.startsWith('http') && platform.href !== '#') ? '' : undefined}
				class="bg-surface border border-border p-6 sm:p-8 rounded-[var(--radius)] relative overflow-hidden transition-all duration-350 hover:border-gold-line hover:translate-y-[-4px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] group reveal delay-{(i % 6) * 100}"
			>
				<div
					class="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 transition-opacity duration-350 group-hover:opacity-100"
				></div>
				<div
					class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold to-teal2 scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100"
				></div>
				<div
					class="inline-block font-['Space_Mono'] text-sm md:text-[8px] tracking-[2px] uppercase px-2.5 py-1 border border-border2 text-muted rounded-[4px] mb-4 transition-all duration-250 group-hover:border-gold-line group-hover:text-gold flex items-center gap-2"
				>
					{platform.badge}
				</div>
				<div class="font-['Bebas_Neue'] text-2xl md:text-[26px] tracking-[1px] mb-2.5 flex items-center gap-3">
					{platform.name}
				</div>
				<p class="text-sm md:text-[12px] leading-[1.75] text-muted2 font-light mb-6">
					{platform.overview}
				</p>
				<div
					class="font-['Space_Mono'] text-sm md:text-[10px] tracking-[1.5px] uppercase text-gold flex items-center gap-2 group-hover:gap-3 transition-all"
				>
					{platform.link}
				</div>
				<div
					class="absolute bottom-6 right-6 font-['Space_Mono'] text-sm md:text-[9px] text-border2 tracking-[1px] transition-colors duration-250 group-hover:text-muted hidden sm:block"
				>
					{platform.domain}
				</div>
			</a>
		{/each}
	</div>
</section>
