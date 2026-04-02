<script lang="ts">
	const certs = [
		{ year: '2025', name: 'Generative AI: Prompt Engineering 🤖', issuer: 'IBM Developer Skills Network' },
		{ year: '2024', name: 'Professional Virtual Assistant 💼', issuer: 'ALX Africa' },
		{ year: '2024', name: 'AI Augmented Professional Development 🚀', issuer: 'ALX Africa' },
		{ year: '2022', name: 'Quality Management System ✈️', issuer: 'Dornier Aviation Training School' },
		{ year: '2022', name: 'Safety Management System 🛡️', issuer: 'Dornier Aviation Training School' },
		{ year: '2017', name: 'Project Management Professional (PMP) 📊', issuer: 'Professional Certification Body' },
		{ year: '2017', name: 'Human Resource Management 👥', issuer: 'Professional Certification' },
		{ year: '2017', name: 'Certificate in Management 🏢', issuer: 'African Management Initiative · South Africa 🇿🇦' }
	];
</script>

<section id="certifications" class="bg-surface border-t border-border px-6 lg:px-12 py-20">
	<div class="reveal mb-12">
		<div
			class="font-['Space_Mono'] text-[10px] tracking-[3px] uppercase text-gold mb-[14px] flex items-center gap-[10px]"
		>
			<span class="w-6 h-[1px] bg-gold"></span> Credentials 📜
		</div>
		<h2 class="font-['Bebas_Neue'] text-[clamp(40px,5vw,72px)] tracking-[1px] leading-[0.95] mb-6">
			Built on<br />verified mastery.
		</h2>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-12">
		{#each certs as cert, i}
			<div class="bg-bg border border-border p-5 rounded-[var(--radius)] transition-all duration-300 hover:border-gold-line hover:bg-surface2 group reveal delay-{i * 50}">
				<div class="font-['Space_Mono'] text-[9px] text-gold tracking-[2px] mb-2">
					{cert.year} 📅
				</div>
				<div class="text-[13px] text-text font-medium leading-[1.4] mb-1 group-hover:text-gold transition-colors">
					{cert.name}
				</div>
				<div class="text-[11px] text-muted font-light mt-1">
					{cert.issuer}
				</div>
			</div>
		{/each}
	</div>
</section>