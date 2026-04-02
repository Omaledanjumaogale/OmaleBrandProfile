<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Ticker from '$lib/components/Ticker.svelte';
	import About from '$lib/components/About.svelte';
	import Services from '$lib/components/Services.svelte';
	import IAMOnboarding from '$lib/components/IAMOnboarding.svelte';
	import Expertise from '$lib/components/Expertise.svelte';
	import Career from '$lib/components/Career.svelte';
	import Ecosystem from '$lib/components/Ecosystem.svelte';
	import Philosophy from '$lib/components/Philosophy.svelte';
	import ThoughtLeadership from '$lib/components/ThoughtLeadership.svelte';
	import Certifications from '$lib/components/Certifications.svelte';
	import Contact from '$lib/components/Contact.svelte';
</script>

<svelte:head>
	<title>Danjuma Umar Omale Ogale · E-WIN Project Founder & Strategist</title>
	<meta name="description" content="Official profile of Danjuma Umar Omale Ogale — AI-Augmented Developer, Sociologist, and Founder of the E-WIN Project. Building Africa's future through tech innovation and the I-AM Network." />
	
	<!-- JSON-LD Schema Markup -->
	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "WebApplication",
		"name": "E-WIN Hub 🌍",
		"url": "https://omalebrandprofile.pages.dev",
		"description": "The central command platform for the Elite Workforce Impact Nigeria ecosystem — housing the mission, activator programmes, I-AM Network portal, and strategic intelligence.",
		"applicationCategory": "BusinessApplication",
		"operatingSystem": "All",
		"author": {
			"@type": "Person",
			"name": "Danjuma Umar Omale Ogale"
		},
		"offers": {
			"@type": "Offer",
			"price": "0",
			"priceCurrency": "USD"
		}
	}
	</script>
</svelte:head>

<Hero />
<Ticker />
<About />
<Services />
<IAMOnboarding />
<Expertise />
<Career />
<Ecosystem />
<Philosophy />
<ThoughtLeadership />
<Certifications />
<Contact />
