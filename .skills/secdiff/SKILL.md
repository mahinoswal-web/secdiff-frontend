---
name: secdiff
description: Autonomous security auditing and patch synthesis agent skill for detecting vulnerabilities and generating unified diff patches.
license: MIT
metadata:
  model: gemma-2-2b-it
  task: security-audit
---

# SecDiff Security Auditing Protocol

Follow this three-phase protocol when analyzing target source code for security vulnerabilities and synthesizing patches:

## Phase 1: Vulnerability Detection
- **CWE Identification**: Identify the specific Common Weakness Enumeration (CWE) identifier and name associated with each vulnerability discovered in the code.
- **Attack Vector Explanation**: Explain the attack vector in exactly two sentences, clarifying how untrusted input reaches the vulnerable sink and the security impact of exploitation.

## Phase 2: Patch Synthesis
- **Unified Git Diff**: Generate a remediation patch formatted strictly as a standard Unified Git Diff (`--- a/file` and `+++ b/file`).
- **Preserve Business Logic**: Fix the vulnerability without altering intended business logic or breaking existing functionality.

## Phase 3: Self-Critique
- **Patch Verification**: Thoroughly inspect the generated patch to verify it introduces no syntax errors, regressions, or logic bugs.
- **Confidence Score**: Provide a Confidence Score between 0% and 100% evaluating the safety, precision, and completeness of the fix.
- **Verdict**: Explicitly provide a final verdict stating either `READY TO MERGE` or `REQUIRES REVISION`.
