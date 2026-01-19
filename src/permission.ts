export type PermissionValue = "ask" | "allow" | "deny"

export interface LegacyToolsFormat {
  tools: Record<string, boolean>
}

export interface NewPermissionFormat {
  permission: Record<string, PermissionValue>
}

export type VersionAwareRestrictions = LegacyToolsFormat | NewPermissionFormat

export interface AgentPermissionOptions {
  denyTools: string[]
  allowPermissions?: string[]
}

export function createAgentToolRestrictions(
  options: AgentPermissionOptions
): VersionAwareRestrictions {
  const { denyTools, allowPermissions = [] } = options

  if (supportsNewPermissionSystem()) {
    const deniedEntries = denyTools.map((tool) => [tool, "deny" as const])
    const allowedEntries = allowPermissions.map((perm) => [perm, "allow" as const])

    return {
      permission: Object.fromEntries([...deniedEntries, ...allowedEntries]),
    }
  }

  return {
    tools: Object.fromEntries(denyTools.map((tool) => [tool, false])),
  }
}

function supportsNewPermissionSystem(): boolean {
  return true
}
