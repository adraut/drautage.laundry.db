# Failed-check triage prompt

Dispatch **only** when a required check (`lint-and-build` or `CodeQL`) is red on a
Dependabot PR. Everything else in this skill runs inline in the orchestrator.

`gh run view --log-failed` emits hundreds of lines of CI output that would otherwise
accumulate across the queue and crowd out the state needed for the final report.
Delegating turns it into five lines. Use `model: "sonnet"` — the agent only reads and
summarizes, taking no irreversible action.

## Dispatch

`Agent(subagent_type: "general-purpose", model: "sonnet", run_in_background: false)`

Substitute `<N>` (PR number) and `<CHECK>` (`lint-and-build` or `CodeQL`), then send the
template below verbatim.

## Prompt template

````
Required check `<CHECK>` failed on Dependabot PR #<N>. Diagnose why and report back.
Read only — make no changes of any kind.

Locate the failing run:

```bash
gh pr checks <N>
```

Pull the failing log:

```bash
gh run view <RUN_ID> --log-failed | tail -60
```

If that is empty or unhelpful, try the specific job:

```bash
gh run view <RUN_ID> --json jobs -q '.jobs[] | select(.conclusion=="failure") | .databaseId'
gh run view --job <JOB_ID> --log | tail -60
```

Useful context: this PR is a dependency bump. The most common causes are a peer-dependency
conflict, a type error from a bumped `@types/*` package, a lint rule changed by a new
oxlint version, or a snapshot test broken by a library update. Local checks run via
`npm run checks` (lint + type-check + test + format).

Hard rules:
- Read only. Never edit files, never `git push`, never run `npm install`, never touch
  `package-lock.json`.
- Never approve, merge, close, or comment on the PR.
- Do not attempt a fix. Diagnosis only.

Report in exactly this shape — at most 5 lines, no log dumps:

CHECK: <check name>
CAUSE: <one sentence — the actual failure, not the symptom>
EVIDENCE: <the single most relevant log line, trimmed>
FIXABLE: <yes-trivial | yes-nontrivial | no-upstream>
NEXT: <one sentence — what a human should do>
````

## Using the result

Record the returned block against the PR as `BLOCKED:check-failed:<name>` and move on to
the next PR. Do not act on `NEXT` — this skill never changes code. Surface it verbatim in
the final report so the user can decide.
