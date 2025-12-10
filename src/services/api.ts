import type { CallDataResponse, CallEntry, ProcessedCallData } from "../types/api"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://script.google.com/macros/s/AKfycbwxV5MIfx_NtVMCtLJ4pNsRLLJD12RKFHCPHadMpBY1ktA8MemIMSxn1K2vYOjIBIIKQw/exec"

export async function fetchCallData(): Promise<ProcessedCallData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: CallDataResponse = await response.json()

    // Transform the data to match our internal structure
    return result.data.map((call: CallEntry) => ({
      id: call["Caller ID"],
      name: call["Caller Name"],
      email: call["Caller Email"],
      transcript: call.Transcript,
      summary: call.Summary,
      date: call["Call Date"],
      fitnessGoal: call["Fitness Goal"],
      recording: call["Call Recording"],
      disconnectedBy: call["Disconnected By"],
      duration: call["Call Duration"],
      status: call["Call Status"],
      segment: call["User Segment"],
    }))
  } catch (error) {
    console.error("Failed to fetch call data:", error)
    throw error
  }
}



