from pathlib import Path

p = Path(r"src/index.css")
text = p.read_text(encoding="utf-8")

# Fix class prefix mismatch: CSS had coach-tour, component uses coach-mark
text = text.replace("coach-tour", "coach-mark")

start = text.find(".coach-mark-actions {")
end = text.find("@keyframes coach-spot-in {")
if start < 0 or end < 0:
    raise SystemExit(f"markers not found start={start} end={end}")

new_actions = """.coach-mark-actions {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
}

.coach-mark-next {
  appearance: none;
  border: 0;
  cursor: pointer;
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: var(--green);
  color: #fff;
  border-radius: 999px;
  padding: 0.45rem 0.9rem;
  transition:
    color 0.2s var(--ease),
    background 0.2s var(--ease),
    border-color 0.2s var(--ease),
    opacity 0.2s var(--ease);
}

.coach-mark-next:hover {
  background: var(--green-deep);
}

"""

text = text[:start] + new_actions + text[end:]
p.write_text(text, encoding="utf-8")
print("ok")
print("skip left", "coach-mark-skip" in text)
print("back left", "coach-mark-back" in text)
print("flex-start", "justify-content: flex-start" in text[start:start+200])
