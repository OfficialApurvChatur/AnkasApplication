import ankas from "@/love/hAsset/business/11.png";

const brand = () => {
	var brandObject

		brandObject = {
			logo: ankas,
			name: "Ankas",
			app: "https://beehive-frontend.netlify.app/",
			admin: "https://beehive-admin.netlify.app/"
		}
						
	return brandObject
}

export default brand