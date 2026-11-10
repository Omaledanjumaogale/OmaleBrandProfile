<script lang="ts">
	let { variant }: { variant: 'public' | 'member' | 'admin' } = $props();
	const designs = {
		public: { title: 'Find your starting point', color: '#18372e', ink: '#f4d6a1', path: 'M0 95Q70 -15 135 70T280 35', links: [['Discover platforms', '/platforms'], ['Join the I-AM Network', '/apply']] },
		member: { title: 'Make today count', color: '#3b2320', ink: '#ffcfb8', path: 'M0 105Q90 100 100 47T180 45T280 10', links: [['Explore platforms', '/platforms'], ['Get help', '/faq']] },
		admin: { title: 'Lead with clarity', color: '#222b41', ink: '#d4e4ff', path: 'M0 110L70 66L112 85L181 30L225 55L280 12', links: [['Monitoring', '/admin/monitoring'], ['Audit trail', '/admin/audit']] }
	};
	let design = $derived(designs[variant]);
</script>

<nav aria-label={design.title} style:--paper={design.color} style:--ink={design.ink}>
	<svg viewBox="0 0 280 120" aria-hidden="true"><path d={design.path} /><path d={design.path} transform="translate(0 12)" /></svg>
	<p>{design.title}</p>
	<div>
		{#each design.links as [label, href]}
			<a {href}>{label} <span aria-hidden="true">↗</span></a>
		{/each}
	</div>
</nav>

<style>
	nav { position: relative; isolation: isolate; overflow: hidden; padding: 1.25rem clamp(1rem, 5%, 3rem); background: var(--paper); color: var(--ink); }
	p { font: italic 2rem/1.2 'Segoe Script', 'Brush Script MT', Georgia, cursive; margin: 0; }
	div { display: flex; flex-wrap: wrap; gap: 0 1.5rem; }
	a { display: inline-flex; align-items: center; gap: .35rem; min-height: 44px; text-decoration: underline; text-underline-offset: .25em; }
	svg { position: absolute; right: 0; bottom: 0; width: min(45%, 20rem); z-index: -1; opacity: .32; fill: none; stroke: currentColor; stroke-width: 1.5; }
	@media (prefers-reduced-motion: no-preference) {
		svg { transition: transform .35s ease; }
		nav:focus-within svg, nav:hover svg { transform: translateX(-.6rem); }
	}
</style>
