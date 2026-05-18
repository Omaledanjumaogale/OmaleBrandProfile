<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
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
<About />
<Services />
<IAMOnboarding />
<Expertise />
<Projects />
<Testimonials />
<Career />
<Ecosystem />
<Philosophy />
<ThoughtLeadership />
<Certifications />
<Contact />

