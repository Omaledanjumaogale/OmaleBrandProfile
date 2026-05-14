<footer class="px-6 sm:px-8 lg:px-12 py-10 border-t border-[var(--border)] bg-[var(--bg)] pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))] sm:pb-10">
	<div class="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
		<!-- Brand -->
		<div class="font-['Bebas_Neue'] text-[22px] tracking-[2px] text-[var(--text)]">
			<span class="text-[var(--gold)]">O</span>MALE PROFILEX
		</div>

		<!-- Copyright -->
		<div class="font-['Space_Mono'] text-[9px] text-[var(--muted)] tracking-[1px] text-center">
			© 2026 Omale Danjuma Ogale. All rights reserved.
		</div>

		<!-- Nav links -->
		<nav aria-label="Footer navigation" class="flex flex-wrap justify-center gap-x-6 gap-y-2">
			{#each [['/#about','About'],['/services','Services'],['/#expertise','Expertise'],['/#contact','Contact']] as [href, label]}
				<a
					{href}
					class="text-[10px] tracking-[1.5px] uppercase text-[var(--muted)] hover:text-[var(--gold)] transition-colors duration-200 font-medium min-h-[44px] flex items-center"
				>
					{label}
				</a>
			{/each}
		</nav>
	</div>
</footer>