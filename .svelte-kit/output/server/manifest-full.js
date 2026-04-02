export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["danjuma-ogale.jpg","platforms/AkademyxDraft.html","platforms/BetxPredicts.html","platforms/BiznexDraft.html","platforms/CollegeCBT.html","platforms/FinancialAuditor.html","platforms/MedPharmRx.html","platforms/MentorMe.html","platforms/SchoolCBT.html","platforms/TradexNews.html","platforms/TradezMarket.html","platforms/VantagePoint.html","robots.txt"]),
	mimeTypes: {".jpg":"image/jpeg",".html":"text/html",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.BVNgLRSK.js",app:"_app/immutable/entry/app.D3rRnxgS.js",imports:["_app/immutable/entry/start.BVNgLRSK.js","_app/immutable/chunks/BidKrlt1.js","_app/immutable/chunks/Dmw75Rqs.js","_app/immutable/entry/app.D3rRnxgS.js","_app/immutable/chunks/Dmw75Rqs.js","_app/immutable/chunks/gBEfYJ_w.js","_app/immutable/chunks/BuxylbeD.js","_app/immutable/chunks/BnS92dSg.js","_app/immutable/chunks/CvA3AgnU.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:true},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/admin/login",
				pattern: /^\/admin\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/admin/settings",
				pattern: /^\/admin\/settings\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/register/iam",
				pattern: /^\/register\/iam\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
