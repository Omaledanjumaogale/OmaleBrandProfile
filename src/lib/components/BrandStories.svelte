<script lang="ts">
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';

	const stories = [
		{ image: 'build', title: 'Build your first version.', keywords: 'Enterprise / Prototyping', text: 'Turn an idea into something customers can try. Explore tools for the next step.', href: '/platforms', label: 'Explore platforms', alt: 'A designer and her team gather around a handbag prototype.' },
		{ image: 'learn', title: 'Make your next move.', keywords: 'Skills / Mentorship', text: 'Develop practical digital skills with the I-AM Network.', href: '/apply', label: 'Explore the I-AM Network', alt: 'An apprentice explains his work to a mentor at a laptop.' },
		{ image: 'grow', title: 'Give your team room to grow.', keywords: 'Operations / Digital strategy', text: 'Find support for the daily work that keeps your business moving.', href: '/services', label: 'Explore services', alt: 'A business owner shows colleagues a workflow in a fulfillment studio.' }
	];
	let index = $state(0);
	let story = $derived(stories[index]);
	function move(delta: number) {
		index = (index + delta + stories.length) % stories.length;
	}
</script>

<section aria-label="E-WIN promotional stories" class="campaign">
	<div class="frame" aria-live="polite">
		{#key story.image}
			<img src="/campaign/{story.image}.webp" srcset="/campaign/{story.image}-640.webp 640w, /campaign/{story.image}.webp 1440w" sizes="(max-width: 1200px) 100vw, 1200px" alt={story.alt} width="1440" height="810" loading="lazy" decoding="async" />
			<div class="copy">
				<p>{story.keywords}</p>
				<h2>{story.title}</h2>
				<p>{story.text}</p>
				<a href={story.href}>{story.label} <ArrowRight size={17} aria-hidden="true" /></a>
			</div>
		{/key}
	</div>
	<div class="controls">
		<button type="button" onclick={() => move(-1)} aria-label="Previous story"><ArrowLeft size={20} /></button>
		<span>{index + 1} / {stories.length}</span>
		<button type="button" onclick={() => move(1)} aria-label="Next story"><ArrowRight size={20} /></button>
	</div>
</section>

<style>
	.campaign { background: #121813; color: #fff8e8; padding: 2rem clamp(1rem, 4%, 4rem); }
	.frame, .controls { max-width: 1200px; margin-inline: auto; }
	.frame { position: relative; display: grid; align-items: end; min-height: 31rem; overflow: hidden; background: #15221d; isolation: isolate; }
	.frame::after { content: ''; position: absolute; inset: 0; z-index: -1; background: linear-gradient(0deg, #101612 3%, #101612c9 31%, transparent 78%); }
	img { position: absolute; inset: 0; z-index: -2; width: 100%; height: 100%; object-fit: cover; object-position: center 40%; }
	.copy { padding: 1.5rem clamp(1.25rem, 5%, 4rem); max-width: 42rem; }
	h2 { font: 400 3.75rem/.94 'Bebas Neue', sans-serif; margin-block: .4rem; }
	p:first-child { color: #ffda96; font: 700 .76rem 'Space Mono', monospace; text-transform: uppercase; }
	a, button { min-height: 44px; display: inline-flex; align-items: center; gap: .5rem; }
	a { color: #ffda96; text-decoration: underline; }
	.controls { display: flex; justify-content: flex-end; align-items: center; gap: .85rem; padding-top: .5rem; }
	button { min-width: 44px; justify-content: center; border: 1px solid #a2b1a3; border-radius: 6px; cursor: pointer; }
	@media (max-width: 640px) {
		.frame { display: block; min-height: auto; }
		img { position: relative; height: auto; aspect-ratio: 4 / 3; }
		.frame::after { display: none; }
		h2 { font-size: 2.55rem; }
	}
	@media (prefers-reduced-motion: no-preference) {
		img { animation: develop .45s ease-out; }
		@keyframes develop { from { opacity: .65; } }
	}
</style>
