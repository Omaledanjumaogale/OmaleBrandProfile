
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/admin" | "/admin/login" | "/admin/settings" | "/dashboard" | "/login" | "/register" | "/register/iam";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/admin": Record<string, never>;
			"/admin/login": Record<string, never>;
			"/admin/settings": Record<string, never>;
			"/dashboard": Record<string, never>;
			"/login": Record<string, never>;
			"/register": Record<string, never>;
			"/register/iam": Record<string, never>
		};
		Pathname(): "/" | "/admin" | "/admin/login" | "/admin/settings" | "/dashboard" | "/login" | "/register/iam";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/danjuma-ogale.jpg" | "/platforms/AkademyxDraft.html" | "/platforms/BetxPredicts.html" | "/platforms/BiznexDraft.html" | "/platforms/CollegeCBT.html" | "/platforms/FinancialAuditor.html" | "/platforms/MedPharmRx.html" | "/platforms/MentorMe.html" | "/platforms/SchoolCBT.html" | "/platforms/TradexNews.html" | "/platforms/TradezMarket.html" | "/platforms/VantagePoint.html" | "/robots.txt" | string & {};
	}
}