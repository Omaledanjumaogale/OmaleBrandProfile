<script lang="ts">
    import type { PageSEO } from '$lib/types/seo';
    import { defaultSEO } from '$lib/seo';
    
    // Svelte 5 Runes for props
    let { meta } = $props<{ meta: PageSEO }>();
    
    // Derived JSON-LD string to ensure correct escaping and formatting for bots
    const jsonLdString = $derived(
        meta.jsonLd && meta.jsonLd.length > 0 
            ? JSON.stringify({ "@context": "https://schema.org", "@graph": meta.jsonLd }) 
            : null
    );
</script>

<svelte:head>
    <!-- Basic Metadata -->
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />
    <link rel="canonical" href={meta.canonical} />

    {#if meta.noIndex}
        <meta name="robots" content="noindex, nofollow" />
    {/if}

    <!-- Open Graph (Facebook / LinkedIn) -->
    <meta property="og:site_name" content={defaultSEO.siteName} />
    <meta property="og:title" content={meta.title} />
    <meta property="og:description" content={meta.description} />
    <meta property="og:url" content={meta.canonical} />
    <meta property="og:type" content={meta.ogType} />
    <meta property="og:image" content={meta.ogImage} />
    <meta property="og:locale" content="en_NG" />

    <!-- Twitter / X Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content={defaultSEO.twitterHandle} />
    <meta name="twitter:title" content={meta.title} />
    <meta name="twitter:description" content={meta.description} />
    <meta name="twitter:image" content={meta.ogImage} />

    <!-- Structured Data (GEO/AEO critical) -->
    {#if jsonLdString}
        <script type="application/ld+json">
            {@html jsonLdString}
        </script>
    {/if}
</svelte:head>
