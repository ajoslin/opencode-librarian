export type PermissionValue = "ask" | "allow" | "deny";
export interface LegacyToolsFormat {
    tools: Record<string, boolean>;
}
export interface NewPermissionFormat {
    permission: Record<string, PermissionValue>;
}
export type VersionAwareRestrictions = LegacyToolsFormat | NewPermissionFormat;
export declare function createAgentToolRestrictions(denyTools: string[]): VersionAwareRestrictions;
