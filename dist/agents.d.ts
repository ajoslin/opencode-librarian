import type { AgentConfig } from "@opencode-ai/sdk";
export declare const LIBRARIAN_PROMPT_METADATA: {
    category: string;
    cost: string;
    promptAlias: string;
    keyTrigger: string;
    triggers: {
        domain: string;
        trigger: string;
    }[];
    useWhen: string[];
};
export declare function createLibrarianAgent(model?: string): AgentConfig;
export declare const librarianAgent: AgentConfig;
