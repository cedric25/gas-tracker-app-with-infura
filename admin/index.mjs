import ky from "ky"
import { env } from "../src/env.ts"

/**
 * Run this script:
 * $> bun admin/index.mjs
 */

const Auth = Buffer.from(
	env.INFURA_API_KEY + ":" + env.INFURA_API_KEY_SECRET,
).toString("base64")

// The chain ID of the supported network
const chainId = 1
;(async () => {
	try {
		const data = await ky
			.get(`https://gas.api.infura.io/networks/${chainId}/suggestedGasFees`, {
				headers: {
					Authorization: `Basic ${Auth}`,
				},
			})
			.json()
		console.log("Suggested gas fees:", data)
	} catch (error) {
		console.log("Server responded with:", error)
	}
})()
