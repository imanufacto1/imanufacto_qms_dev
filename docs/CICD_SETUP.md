# CI/CD Setup & Branch Protection Guide

To enforce the workflow: **Dev (Commit allowed) -> QA (PR only) -> Prod (PR only)**, you must configure **GitHub Branch Protection Rules**. The pipeline file (`.github/workflows/pipeline.yml`) handles the automation, but GitHub settings handle the permissions.

## 1. Create Environments in GitHub
Go to **Settings** > **Environments** and create three environments:
1.  `development`
2.  `qa`
3.  `production` (Recommended: Add "Required reviewers" for this environment for extra safety).

## 2. Configure Branch Protection Rules
Go to **Settings** > **Branches** > **Add branch protection rule** for each branch:

### A. Rule for `dev` Branch
*   **Branch name pattern**: `dev`
*   **Protect matching branches**: Check this.
*   **Require status checks to pass before merging**: Check this.
    *   Search and select: `CI Check (Lint, Type, Test)` (This ensures code is clean before merge).
*   *Note: Do NOT check "Require a pull request" if you want to allow direct commits, but it is recommended to require PRs even for dev in teams.*

### B. Rule for `qa` Branch (Strict)
*   **Branch name pattern**: `qa`
*   **Require a pull request before merging**: **CHECK THIS**.
    *   *Require approvals*: 1 (or more).
*   **Require status checks to pass before merging**: Check this.
    *   Select: `CI Check (Lint, Type, Test)`.
*   **Lock branch**: (Optional) To prevent direct commits, but "Require a pull request" usually suffices.

### C. Rule for `prod` Branch (Strictest)
*   **Branch name pattern**: `prod`
*   **Require a pull request before merging**: **CHECK THIS**.
    *   *Require approvals*: 1 or 2 (Senior devs).
*   **Require status checks to pass before merging**: Check this.
    *   Select: `CI Check (Lint, Type, Test)`.
*   **Include administrators**: Check this to enforce rules even on admins.

## 3. The Workflow
1.  **Feature Work**: Developers create `feature/*` branches and PR to `dev`.
2.  **Dev Deploy**: When code lands in `dev`, the pipeline automatically deploys to **Dev**.
3.  **QA Promotion**: Create a PR from `dev` -> `qa`. Once merged, the pipeline deploys to **QA**.
4.  **Prod Release**: Create a PR from `qa` -> `prod`. Once merged, the pipeline deploys to **Prod**.
