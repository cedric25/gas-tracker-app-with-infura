import ky from 'ky'
import { env } from '@/env'

const Auth = Buffer.from(
	env.INFURA_API_KEY + ':' + env.INFURA_API_KEY_SECRET,
).toString('base64')

// The chain ID of the supported network
const chainId = 1

export type GasFeeEstimate = {
	suggestedMaxPriorityFeePerGas: string
	suggestedMaxFeePerGas: string
	minWaitTimeEstimate: number
	maxWaitTimeEstimate: number
}

type GasFeesApiResponse = {
	low: GasFeeEstimate
	medium: GasFeeEstimate
	high: GasFeeEstimate
	estimatedBaseFee: string
	networkCongestion: number
	latestPriorityFeeRange: string[]
	historicalPriorityFeeRange: string[]
	historicalBaseFeeRange: string[]
	priorityFeeTrend: 'up' | 'down'
	baseFeeTrend: 'up' | 'down'
}

export const getData = async () => {
	try {
		const data = await ky(
			`https://gas.api.infura.io/networks/${chainId}/suggestedGasFees`,
			{
				headers: {
					Authorization: `Basic ${Auth}`,
				},
			},
		).json()

		return data as GasFeesApiResponse
	} catch (error) {
		console.log('Server responded with:', error)
	}
}
