import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "JaredIsCoding",
		short_name: "JaredIsCoding",
		description: "JaredIsCoding website and calculators",
		id: "/?source=pwa",
		start_url: "/tools/onewheel?source=pwa",
		scope: "/",
		display: "fullscreen",
		background_color: "#060913",
		theme_color: "#58e6dd",
		icons: [
			{
				src: "/images/sizes/192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/images/sizes/512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
		shortcuts: [
			{
				name: "All Tools",
				short_name: "Tools",
				description: "Open full tools list",
				url: "/tools?source=pwa",
				icons: [
					{
						src: "/images/sizes/192.png",
						sizes: "192x192",
					},
				],
			},
		],
		screenshots: [
			{
				src: "/images/screenshots/wide1.png",
				type: "image/jpg",
				sizes: "1920x1080",
				form_factor: "wide",
			},
			{
				src: "/images/screenshots/wide2.png",
				type: "image/jpg",
				sizes: "1920x1080",
				form_factor: "wide",
			},
			{
				src: "/images/screenshots/narrow1.png",
				type: "image/jpg",
				sizes: "360x652",
				form_factor: "narrow",
			},
		],
	}
}
