# SecDiff - Autonomous Static Code Auditing Agent
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

SecDiff is a local-first, autonomous security agent that doesn't just find vulnerabilities—it fixes them. Powered by Google's open-weight model, it scans code, identifies CWEs, and synthesizes 100% accurate Unified Git Diff patches without breaking business logic.

## 🧠 Powered by Gemma & Agent Skills
- **Model**: Runs locally using the 2 Billion parameter `gemma-2-2b-it-GGUF`. Fully offline, private, and free of API costs.
- **Agent Skills Open Standard**: Built strictly adhering to the Agent Skills framework. See our protocol logic in `.skills/secdiff/SKILL.md`.

## 🚀 Quickstart

1. **Clone the repository & install dependencies:**
```bash
git clone [https://github.com/YOUR_GITHUB_USERNAME/secdiff-agent.git](https://github.com/YOUR_GITHUB_USERNAME/secdiff-agent.git)
cd secdiff-agent
pip install -r requirements.txt
```
