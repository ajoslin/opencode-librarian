export type PermissionValue = "ask" | "allow" | "deny"

export interface LegacyToolsFormat {
  tools: Record<string, boolean>
}

export interface NewPermissionFormat {
  permission: Record<string, PermissionValue>
}

export type VersionAwareRestrictions = LegacyToolsFormat | NewPermissionFormat

export function createAgentToolRestrictions(
  denyTools: string[]
): VersionAwareRestrictions {
  if (supportsNewPermissionSystem()) {
    return {
      permission: Object.fromEntries(
        denyTools.map((tool) => [tool, "deny" as const])
      ),
    }
  }

  return {
    tools: Object.fromEntries(denyTools.map((tool) => [tool, false])),
  }
}

function supportsNewPermissionSystem(): boolean {
  return true
}
