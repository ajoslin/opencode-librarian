import type { Plugin } from "@opencode-ai/plugin"
import { createLibrarianAgent } from "./agents"

const OpencodeLibrarianPlugin: Plugin = async () => {
  const librarian = createLibrarianAgent()

  return {
    config: async (config) => {
      const agentConfig = (config.agent as Record<string, unknown> | undefined) ?? {}
      config.agent = {
        ...agentConfig,
        librarian,
      }
    },
  }
}

export default OpencodeLibrarianPlugin
