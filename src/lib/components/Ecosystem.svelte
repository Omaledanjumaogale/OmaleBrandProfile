<script lang="ts">
	const platforms = [
		{
			badge: 'Headquarters',
			name: 'E-WIN Hub',
			overview: 'The central command platform for the Elite Workforce Impact Nigeria ecosystem — housing the mission, activator programmes, I-AM Network portal, and strategic intelligence for all sub-platforms.',
			icon: '🏢',
			href: 'https://ewinproject.org',
			external: true
		},
		{
			badge: 'Marketplace',
			name: 'DealxHire',
			overview: 'A domestic and professional services marketplace connecting vetted service providers to clients across Nigeria. The centralised hub for E-Deals mobile application platform — matching supply and demand at scale.',
			icon: '🛒',
			href: 'https://dealxhire.org',
			external: true
		},
		{
			badge: 'Education',
			name: 'AkademyX',
			overview: 'An AI-powered upskilling and decentralised education platform delivering personalised skill development pathways in technology, business, and the digital economy.',
			icon: '🎓',
			href: '/platforms/AkademyxDraft.html',
			external: false
		},
		{
			badge: 'Alternative Education',
			name: 'Alternative AkademyX',
			overview: 'The alternative education arm — offering non-traditional, outcomes-focused learning experiences that challenge conventional academic pathways and deliver real-world skills with immediate economic application.',
			icon: '💡',
			href: '/platforms/AlternativeAkademy.html',
			external: false
		},
		{
			badge: 'Personal Branding',
			name: 'ProfileX',
			overview: 'A personal brand and portfolio management platform enabling professionals to build premium digital profiles that showcase expertise, services, and career achievements.',
			icon: '👤',
			href: '/platforms/ProfileX.html',
			external: false
		},
		{
			badge: 'Community',
			name: 'I-AM Network',
			overview: 'The Impact Ambassador Network — a decentralised workforce of vetted, trained professionals performing distributed work across the E-WIN ecosystem with revenue sharing built in.',
			icon: '👥',
			href: '#iam-onboarding',
			external: false
		},
		{
			badge: 'Recruitment',
			name: 'AgentListingX',
			overview: 'An intelligent agent listing and recruitment platform that connects businesses with vetted service agents, field operatives, and freelance professionals across multiple industries.',
			icon: '📋',
			href: '/platforms/AgentListingX.html',
			external: false
		},
		{
			badge: 'Marketing',
			name: 'ApexMarketer',
			overview: 'A comprehensive digital marketing automation platform providing campaign management, audience analytics, and multi-channel outreach tools for growing businesses.',
			icon: '📣',
			href: '/platforms/ApexMarketer.html',
			external: false
		},
		{
			badge: 'Business Intelligence',
			name: 'BizneXense',
			overview: 'An enterprise business intelligence suite delivering real-time financial dashboards, operational insights, and data-driven decision support for SMEs and corporations.',
			icon: '📊',
			href: '/platforms/BizneXense.html',
			external: false
		},
		{
			badge: 'Business Planning',
			name: 'Biznex Draft',
			overview: 'Strategic business planning and operational modelling for emerging market enterprises — from lean canvas creation to comprehensive business plan generation.',
			icon: '👔',
			href: '/platforms/BiznexDraft.html',
			external: false
		},
		{
			badge: 'Sports Analysis',
			name: 'BetxPredicts',
			overview: 'Data-driven sports predictions and analytical modelling for informed decision making, powered by statistical analysis and machine learning algorithms.',
			icon: '⚽',
			href: '/platforms/BetxPredicts.html',
			external: false
		},
		{
			badge: 'Tertiary Education',
			name: 'College CBT',
			overview: 'Advanced computer-based testing infrastructure for higher education institutions — delivering secure, scalable examination platforms for universities and polytechnics.',
			icon: '🏛️',
			href: '/platforms/CollegeCBT.html',
			external: false
		},
		{
			badge: 'K-12 Education',
			name: 'School CBT',
			overview: 'Computer-based testing and digital assessment platform for primary and secondary schools — modernising how students learn and are evaluated across Nigeria.',
			icon: '📖',
			href: '/platforms/SchoolCBT.html',
			external: false
		},
		{
			badge: 'Finance',
			name: 'Financial Auditor',
			overview: 'Automated financial auditing and verification systems for transparent economic activity — helping businesses maintain compliance and financial integrity.',
			icon: '🏦',
			href: '/platforms/FinancialAuditor.html',
			external: false
		},
		{
			badge: 'Healthcare',
			name: 'MedPharmRx',
			overview: 'Pharmaceutical supply chain tracking and medical inventory management solutions — ensuring drug availability, reducing waste, and improving healthcare delivery.',
			icon: '🩺',
			href: '/platforms/MedPharmRx.html',
			external: false
		},
		{
			badge: 'Mentorship',
			name: 'MentorMe',
			overview: 'Peer-to-peer professional mentorship network connecting experienced leaders with emerging talent — structured programmes for career acceleration and knowledge transfer.',
			icon: '🤝',
			href: '/platforms/MentorMe.html',
			external: false
		},
		{
			badge: 'Market Intelligence',
			name: 'MarketIntel',
			overview: 'Real-time market intelligence and trade analytics platform providing actionable insights for commodities, forex, and emerging market investment decisions.',
			icon: '📈',
			href: '/platforms/MarketIntel.html',
			external: false
		},
		{
			badge: 'Media',
			name: 'NewsTrade',
			overview: 'Real-time market news, economic analysis, and financial reporting for the African trade sector — delivering quality journalism focused on economic empowerment.',
			icon: '📰',
			href: '/platforms/NewsTrade.html',
			external: false
		},
		{
			badge: 'Commerce',
			name: 'InsightsTrade',
			overview: 'Decentralised marketplace for physical and digital goods, powered by the E-WIN infrastructure — enabling vendors and buyers to transact securely at scale.',
			icon: '📦',
			href: '/platforms/InsightsTrade.html',
			external: false
		},
		{
			badge: 'Strategy',
			name: 'VantagePoint',
			overview: 'High-level strategic insights and data visualisation for ecosystem-wide performance monitoring — giving leadership a 360-degree view of operations.',
			icon: '🔭',
			href: '/platforms/VantagePoint.html',
			external: false
		}
	];
</script>

<section id="ecosystem" class="bg-bg px-6 lg:px-12 py-20">
	<!-- Section Header -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-14">
		<div class="reveal">
			<div class="font-['Space_Mono'] text-[10px] md:text-xs tracking-[3px] uppercase text-gold mb-[14px] flex items-center gap-[10px]">
				<span class="w-6 h-[1px] bg-gold" aria-hidden="true"></span> E-WIN Ecosystem
			</div>
			<h2 class="font-['Bebas_Neue'] text-[clamp(36px,5vw,72px)] tracking-[1px] leading-[0.95] mb-6 text-text">
				Twenty platforms.<br />One mission.
			</h2>
		</div>
		<div class="text-sm md:text-[15px] leading-[1.8] text-text font-normal reveal delay-100">
			<p>
				The E-WIN Project is an interconnected ecosystem of digital platforms united by a single conviction: that <strong>Africa's workforce gap is solvable</strong> — not through charity, but through intelligent, scalable systems built by Africans for Africans.<br /><br />Tagline: <strong class="text-gold">Learn. Work. Earn.</strong>
			</p>
		</div>
	</div>

	<!-- Platform Cards Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
		{#each platforms as platform, i}
			<div class="bg-surface border border-border rounded-[var(--radius)] relative overflow-hidden transition-all duration-300 hover:border-gold-line hover:translate-y-[-4px] hover:shadow-xl group flex flex-col reveal delay-{(i % 8) * 50}">

				<!-- Top accent bar -->
				<div class="h-[2px] bg-gradient-to-r from-gold to-teal2 scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" aria-hidden="true"></div>

				<!-- Card body -->
				<div class="p-5 sm:p-6 flex flex-col flex-grow">
					<!-- Badge -->
					<div class="inline-flex items-center gap-2 font-['Space_Mono'] text-[9px] tracking-[2px] uppercase px-2.5 py-1 border border-border2 text-muted rounded-[4px] mb-4 transition-all duration-250 group-hover:border-gold-line group-hover:text-gold self-start">
						{platform.badge}
					</div>

					<!-- Icon + Name -->
					<div class="flex items-center gap-3 mb-3">
						<div class="w-10 h-10 bg-gold-dim border border-gold-line rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true">
							{platform.icon}
						</div>
						<h3 class="font-['Bebas_Neue'] text-xl md:text-[22px] tracking-[1px] text-text leading-tight">
							{platform.name}
						</h3>
					</div>

					<!-- Description -->
					<p class="text-[12px] md:text-[13px] leading-[1.7] text-muted2 font-normal mb-5 flex-grow">
						{platform.overview}
					</p>

					<!-- Explore More button -->
					<a
						href={platform.href}
						target={platform.external ? '_blank' : '_self'}
						rel={platform.external ? 'noopener noreferrer' : ''}
						data-sveltekit-reload={(!platform.external && platform.href !== '#iam-onboarding') ? '' : undefined}
						class="w-full py-2.5 bg-gold/10 border border-gold/30 text-gold text-[10px] font-bold tracking-[2px] uppercase rounded-xl hover:bg-gold hover:text-white transition-all duration-300 min-h-[44px] flex items-center justify-center gap-2 group/btn mt-auto"
					>
						{platform.external ? 'Visit Platform' : 'Explore More'}
						<span class="transition-transform group-hover/btn:translate-x-1" aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		{/each}
	</div>

	<!-- Ecosystem summary bar -->
	<div class="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 reveal">
		{#each [['20','Active Platforms'],['6+','Sectors Covered'],['10M+','Youth Targeted'],['∞','Impact Potential']] as [num, label]}
			<div class="bg-surface border border-border rounded-xl p-4 text-center">
				<div class="font-['Bebas_Neue'] text-[28px] sm:text-[36px] text-gold tracking-widest leading-none">{num}</div>
				<div class="text-[9px] font-bold tracking-[2px] uppercase text-text mt-1">{label}</div>
			</div>
		{/each}
	</div>
</section>
