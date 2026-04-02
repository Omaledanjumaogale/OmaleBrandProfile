<script lang="ts">
	import ServiceRequestForm from './ServiceRequestForm.svelte';
</script>

<section id="contact" class="bg-bg border-t border-border px-6 lg:px-12 py-20">
	<div class="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
		<div class="text-left">
			<div class="font-['Space_Mono'] text-sm md:text-[10px] tracking-[3px] uppercase text-gold mb-5 reveal">
				Let's Build Together 🤝
			</div>
			<h2 class="font-['Bebas_Neue'] text-[clamp(40px,6vw,84px)] tracking-[2px] leading-[0.9] mb-6 reveal delay-100">
				Ready to<br /><span class="text-gold italic">collaborate?</span>
			</h2>
			<p class="text-sm md:text-[15px] text-muted2 leading-[1.8] font-light mb-12 reveal delay-200 max-w-[500px]">
				Whether you are an investor, a partner, a talented builder, or someone who believes in the E-WIN mission — I want to hear from you. Great things are built in rooms where the right people have the courage to connect. 🚀
			</p>
			
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-10 border-t border-border reveal delay-400">
				<div class="flex flex-col items-start gap-1.5">
					<span class="font-['Space_Mono'] text-sm md:text-[9px] tracking-[2px] uppercase text-muted">Email 📧</span>
					<a href="mailto:omaledanjumaogale@gmail.com" class="text-sm md:text-[13px] text-text hover:text-gold transition-colors min-h-[44px] flex items-center">omaledanjumaogale@gmail.com</a>
				</div>
				<div class="flex flex-col items-start gap-1.5">
					<span class="font-['Space_Mono'] text-sm md:text-[9px] tracking-[2px] uppercase text-muted">Mobile 📱</span>
					<a href="tel:+2349025152818" class="text-sm md:text-[13px] text-text hover:text-gold transition-colors min-h-[44px] flex items-center">+234-902-515-2818</a>
				</div>
				<div class="flex flex-col items-start gap-1.5">
					<span class="font-['Space_Mono'] text-sm md:text-[9px] tracking-[2px] uppercase text-muted">LinkedIn 🔗</span>
					<a href="https://linkedin.com/in/omaledanjumaogale" target="_blank" class="text-sm md:text-[13px] text-text hover:text-gold transition-colors min-h-[44px] flex items-center">omaledanjumaogale</a>
				</div>
				<div class="flex flex-col items-start gap-1.5">
					<span class="font-['Space_Mono'] text-sm md:text-[9px] tracking-[2px] uppercase text-muted">Base 📍</span>
					<span class="text-sm md:text-[13px] text-text min-h-[44px] flex items-center">Gwarinpa, Abuja 🇳🇬</span>
				</div>
			</div>
		</div>

		<div class="reveal delay-300 bg-surface border border-border p-6 sm:p-8 rounded-[var(--radius)] shadow-2xl relative overflow-hidden">
			<div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-teal2"></div>
			<h3 class="font-['Bebas_Neue'] text-3xl tracking-widest text-text mb-6">Service Request Form 🛠️</h3>
			<ServiceRequestForm />
		</div>
	</div>
</section>