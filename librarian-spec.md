# Amp Librarian spec (draft for OpenCode plugin)

## Sources and confidence
- Official docs: Amp Librarian announcement and Owner's Manual (high confidence).
- Community notes: Hamel's blog and Abil Shr's architecture writeup (medium/low confidence; some details explicitly noted as reverse engineered or corrected by Amp team).

## Goals
- Provide a dedicated research subagent that can search and read remote codebases on GitHub.
- Deliver deep, detailed explanations by retrieving relevant source files and examples across repositories.
- Keep the main agent focused on execution while the Librarian focuses on information retrieval.

## Non-goals
- No code writing or editing.
- No local file modification.
- No running commands or tests.
- No searching non-code content outside GitHub unless explicitly enabled in a future extension.

## User-facing behavior
- The Librarian is a callable subagent, triggered explicitly in prompts ("use the Librarian to...") or implicitly when the task requires cross-repo or dependency code lookup. The manual notes you might need to prompt explicitly in some cases.
- Typical tasks:
  - Find implementations in upstream libraries (e.g., React internals).
  - Locate examples in open source repos.
  - Trace behavior across multiple repositories (e.g., docs + infra).
  - Investigate errors by showing source-level validation logic.
- Responses are long-form and detailed, optimized for understanding rather than brevity.

## Data sources
- GitHub public repositories.
- GitHub private repositories, when the user authorizes access.

## Access and authorization
- Requires a GitHub connection configured in Amp settings.
- For private repos, the user must explicitly select repositories during GitHub app installation/authorization.
- If not configured, the Librarian cannot access GitHub and should return an actionable error message.
- The manual links to GitHub app installation and authorization docs for private repo access requirements.

## Search and retrieval behavior
- Searches and reads code in remote repositories.
- Searches are performed on the default branch only (no tags, no PRs, no historical branches).
- Answers are typically longer and more detailed by design.
- Expected to retrieve:
  - File contents relevant to a query.
  - Context around definitions and call sites.
  - Examples of usage across repositories.

## Output format and content
- Detailed summaries with:
  - File paths and repository references.
  - Excerpts or paraphrases of relevant code.
  - Explanation of behavior and relationships across files.
  - Cross-repo or dependency linkage when applicable.
- Prefer accuracy and attribution over speculation.
- If the answer relies on inference, label it as inference.

## Interaction model
- Librarian acts like a subagent focused solely on search and read.
- Main agent may instruct the Librarian with explicit tasks; results are returned to the main agent for synthesis.
- If the user requires further action (edits/tests), the main agent should perform it after the Librarian completes its retrieval.

## Error handling
- Missing GitHub connection: provide steps to configure and retry.
- Access denied (private repo not authorized): explain that the repo must be selected in the GitHub app installation.
- Suggest the user check `settings#code-host-connections` if the connection is missing or stale.
- No results: report the query used and suggest adjustments (repo scope, query terms, or symbols).

## Prompting guidance (examples)
- "Use the Librarian to look up how React's useEffect cleanup is implemented."
- "Ask the Librarian to explain why this Zod validation error occurs and show the logic causing it."
- "Use the Librarian to trace how our docs get deployed across the docs and infra repos."

## Plugin-level requirements for OpenCode
- Provide a subagent tool named `librarian` with strict read/search-only permissions.
- Provide two primary operations:
  - `search_github(query, repo_scope, language?, path_globs?, limit?)`
  - `read_github(repo, path, ref=default_branch)`
- Enforce default-branch-only reads.
- Support multi-repo search with repository allowlists.
- Return structured results that include repo, path, and code context.

## Plugin-level UX
- When invoked, display that a remote code search is running.
- Return detailed notes and linkable paths (repo + path + line hints if available).

## Open questions
- Whether Amp's Librarian also searches documentation sites beyond GitHub (community notes suggest it might, but official docs do not).
- Ranking or relevance strategy used in GitHub searches.
- Maximum result size and any timeouts or rate limits.

## Reference implementation (oh-my-opencode)
- The `librarian` agent denies only `write` and `edit`, allowing other tools including Bash and MCP tools.
- It explicitly uses `context7`, `grep_app`, and optional web search/webfetch for conceptual queries, plus `gh` CLI cloning and `git` for implementation and history.
- It mandates GitHub permalinks for every code claim and structured evidence formatting.
- It defines phased workflows (Type A/B/C/D), with guidance on parallelism and recovery paths.
- It includes date-awareness guidance (prefer 2025+ in queries) and response rules (no tool names, no preamble, always cite).

## Differences vs Amp official Librarian
- Amp docs limit scope to GitHub code search/read on default branch; reference implementation expands to docs, web search, and issue/PR context.
- Amp docs mention detailed answers but not mandatory citations; reference implementation requires permalinks for code claims.
- Amp docs are light on workflow; reference implementation is highly prescriptive about phases and tools.

## Known uncertainties (do not assume in implementation)
- Internal model/tooling architecture is not public.
- Some community speculation about multi-agent orchestration is not confirmed.
- Do not assume access to branches, tags, or non-default ref history.
