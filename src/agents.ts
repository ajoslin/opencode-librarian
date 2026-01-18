import type { AgentConfig } from "@opencode-ai/sdk"
import { DEFAULT_MODEL, DEFAULT_TEMPERATURE, LIBRARIAN_DESCRIPTION, LIBRARIAN_PROMPT } from "./constants"
import { createAgentToolRestrictions } from "./permission"

export const LIBRARIAN_PROMPT_METADATA = {
  category: "exploration",
  cost: "CHEAP",
  promptAlias: "Librarian",
  keyTrigger: "External library/source mentioned -> fire `librarian` background",
  triggers: [
    {
      domain: "Librarian",
      trigger:
        "Unfamiliar packages/libraries or weird behavior; need implementation or open source examples",
    },
  ],
  useWhen: [
    "How do I use [library]?",
    "What's the best practice for [framework feature]?",
    "Why does [external dependency] behave this way?",
    "Find examples of [library] usage",
    "Working with unfamiliar npm/pip/cargo packages",
  ],
}

export function createLibrarianAgent(model: string = DEFAULT_MODEL): AgentConfig {
  const restrictions = createAgentToolRestrictions(["write", "edit"])

  return {
    description: LIBRARIAN_DESCRIPTION,
    mode: "subagent" as const,
    model,
    temperature: DEFAULT_TEMPERATURE,
    ...restrictions,
    prompt: LIBRARIAN_PROMPT,
  }
}

export const librarianAgent = createLibrarianAgent()
