import os
import subprocess
import sys
import tempfile

from llama_cpp import Llama
from rich.console import Console
from rich.markdown import Markdown
from rich.table import Table

MODEL_PATH = os.environ.get(
    "GEMMA_MODEL_PATH",
    "/Users/mahinamitoswal/.cache/lm-studio/models/lmstudio-community/gemma-2-2b-it-GGUF/gemma-2-2b-it.gguf",
)
SKILL_PATH = ".skills/secdiff/SKILL.md"

console = Console()


def load_skill() -> str:
    """Reads SKILL_PATH and extracts only the Markdown body, stripping YAML frontmatter."""
    with open(SKILL_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # Frontmatter is delimited by leading '---' and subsequent '---'
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            return parts[2].strip()

    return content.strip()


def run_audit(target_file: str) -> str:
    """
    Reads the target file into a variable, initializes the Llama model,
    and executes the autonomous security audit and patch synthesis loop.
    Returns 'Safe' if no vulnerabilities were identified, otherwise 'Vulnerable'.
    """
    with open(target_file, "r", encoding="utf-8") as f:
        code_content = f.read()

    if not os.path.exists(MODEL_PATH):
        console.print(
            f"[bold red]Model file not found at {MODEL_PATH}.\n"
            "Please verify you have downloaded the Gemma-2-2b-it GGUF file.\n"
            "To use a custom path, run the script like this:\n"
            "GEMMA_MODEL_PATH='/path/to/your/model.gguf' python harness.py[/bold red]"
        )
        sys.exit(1)

    console.print("Loading model...")
    llm = Llama(
        model_path=MODEL_PATH,
        n_ctx=2048,
        verbose=False,
    )

    skill_rules = load_skill()
    system_prompt = f"You are SecDiff, an autonomous security agent.\n\n{skill_rules}"

    user_prompt = (
        "Please analyze the provided code for security vulnerabilities. "
        "Identify the CWE, explain the attack vector, generate a Unified Diff patch without breaking business logic, "
        f"and run a self-critique.\n\nTarget Code:\n```python\n{code_content}\n```"
    )

    prompt = f"<start_of_turn>user\n{system_prompt}\n\n{user_prompt}<end_of_turn>\n<start_of_turn>model\n"

    console.print("[bold yellow]Running security audit and patch generation...[/bold yellow]")

    response = llm(
        prompt,
        max_tokens=1024,
        temperature=0.2,
        stop=["<end_of_turn>"],
    )

    extracted_text = response["choices"][0]["text"].strip()
    console.print(Markdown(extracted_text))

    if (
        "No vulnerabilities were identified" in extracted_text
        or "does not contain any explicit vulnerabilities" in extracted_text
    ):
        return "Safe"
    return "Vulnerable"


def print_summary(results: list) -> None:
    """Prints a summary table showing each audited file and its security status."""
    table = Table(title="SecDiff Final Audit Summary")
    table.add_column("File")
    table.add_column("Status")

    for item in results:
        raw_status = item.get("status", "")
        if raw_status == "Vulnerable":
            status_display = "[bold red]Vulnerable[/bold red]"
        elif raw_status == "Safe":
            status_display = "[bold green]Safe[/bold green]"
        else:
            status_display = raw_status
        table.add_row(item.get("file", ""), status_display)

    console.print(table)


def audit_git_repo(repo_url: str) -> None:
    """Clones a remote git repository into a temporary directory and audits all Python files."""
    results = []
    with tempfile.TemporaryDirectory() as temp_dir:
        console.print(f"[bold cyan]Cloning repository: {repo_url}[/bold cyan]")
        try:
            subprocess.run(
                ["git", "clone", "--depth", "1", repo_url, temp_dir],
                check=True,
                capture_output=True,
                text=True,
            )
        except subprocess.CalledProcessError as e:
            console.print(f"[bold red]Failed to clone repository: {e.stderr.strip()}[/bold red]")
            sys.exit(1)

        try:
            for root, dirs, files in os.walk(temp_dir):
                dirs[:] = [d for d in dirs if d not in (".git", "__pycache__")]
                for file in files:
                    if file.endswith(".py"):
                        file_path = os.path.join(root, file)
                        console.print(f"[bold magenta]Auditing: {file_path}[/bold magenta]")
                        status = run_audit(file_path)
                        results.append({"file": file_path, "status": status})
        except KeyboardInterrupt:
            console.print("[bold yellow]\nAudit interrupted by user. Generating partial summary...[/bold yellow]")
        finally:
            print_summary(results)


if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "test_code.py"
    if target.startswith("http://") or target.startswith("https://"):
        audit_git_repo(target)
    else:
        results = []
        try:
            status = run_audit(target)
            results.append({"file": target, "status": status})
        except KeyboardInterrupt:
            console.print("[bold yellow]\nAudit interrupted by user. Generating partial summary...[/bold yellow]")
        finally:
            print_summary(results)



