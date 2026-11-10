<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import BrandStories from '$lib/components/BrandStories.svelte';
	import BrandBanner from '$lib/components/BrandBanner.svelte';
	import StoryCard from '$lib/components/StoryCard.svelte';
	import Ticker from '$lib/components/Ticker.svelte';
	import About from '$lib/components/About.svelte';
	import Services from '$lib/components/Services.svelte';
	import IAMOnboarding from '$lib/components/IAMOnboarding.svelte';
	import Expertise from '$lib/components/Expertise.svelte';
	import Career from '$lib/components/Career.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
	import Ecosystem from '$lib/components/Ecosystem.svelte';
	import Philosophy from '$lib/components/Philosophy.svelte';
	import ThoughtLeadership from '$lib/components/ThoughtLeadership.svelte';
	import Certifications from '$lib/components/Certifications.svelte';
	import Contact from '$lib/components/Contact.svelte';
</script>

<svelte:head>
	<title>Omale Danjuma Ogale — Tech Leader, Builder & Nation Builder | ProfileX</title>
	<meta name="description" content="Official personal brand of Omale Danjuma Ogale — entrepreneur, software architect, workforce innovation strategist, and founder of the E-WIN Project. Explore his story, services, and mission." />

	<!-- JSON-LD Schema Markup -->
	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "Person",
		"name": "Omale Danjuma Ogale",
		"url": "https://omaledanjumaogale.ewinproject.org",
		"jobTitle": "Entrepreneur, Tech Leader & Nation Builder",
		"description": "Omale Danjuma Ogale is the founder of the E-WIN Project, a software architect, and a workforce innovation strategist committed to building sustainable income pathways in Nigeria.",
		"sameAs": [],
		"knowsAbout": ["Software Architecture", "AI & Automation", "Workforce Development", "Entrepreneurship", "Nation Building"]
	}
	</script>
</svelte:head>

<Hero />
<Ticker />
<BrandStories />
<About />
<div class="px-4"><StoryCard image="sketch" alt="A designer sketches a handbag beside teal fabric swatches." title="Start with what you can make." text="A sketch gives you something to test. E-WIN helps you find tools for the step after that." href="/platforms" label="Find a platform" /></div>
<Services />
<IAMOnboarding />
<Expertise />
<Projects />
<Testimonials />
<Career />
<Ecosystem />
<div class="px-4"><StoryCard image="plan" alt="Two coworkers map out a process on paper." title="Give good work a repeatable process." text="When a team outgrows its old routine, a clearer digital workflow can give people time back." href="/services" label="Find project support" /></div>
<Philosophy />
<ThoughtLeadership />
<Certifications />
<BrandBanner variant="public" />
<Contact />

