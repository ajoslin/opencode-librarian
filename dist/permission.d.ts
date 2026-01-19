export type PermissionValue = "ask" | "allow" | "deny";
export interface LegacyToolsFormat {
    tools: Record<string, boolean>;
}
export interface NewPermissionFormat {
    permission: Record<string, PermissionValue>;
}
export type VersionAwareRestrictions = LegacyToolsFormat | NewPermissionFormat;
export interface AgentPermissionOptions {
    denyTools: string[];
    allowPermissions?: string[];
}
export declare function createAgentToolRestrictions(options: AgentPermissionOptions): VersionAwareRestrictions;
