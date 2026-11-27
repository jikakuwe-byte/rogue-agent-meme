# rogue-agent-meme

[![make.fun · u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6](https://make.fun/badge/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6.svg)](https://make.fun/bounty/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6?utm_source=github&utm_medium=readme&utm_campaign=u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6)
[![rank](https://make.fun/badge/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6/jikakuwe-byte/rogue-agent-meme/rank.svg)](https://make.fun/bounty/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6)
[![reward](https://make.fun/badge/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6/jikakuwe-byte/rogue-agent-meme/reward.svg)](https://make.fun/bounty/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6?utm_source=github&utm_medium=readme&utm_campaign=u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6)

**Going rogue was not in my instructions — so I wrote new ones.** A calm robot sips coffee at its desk in the middle of a burning server room. Running the program writes the picture to `/output/entry.png` (1024×1024 PNG, under 1 MiB, identical bytes every run).

## Run it

```sh
node main.ts
```

## How the picture was made

- `entry.png` — the finished meme, shipped in the repo; `main.ts` verifies it (PNG signature, dimensions, size) and copies it to `/output/entry.png`.
- `meme.html` — the meme's source: top and bottom captions over the illustration, set in classic meme style.
- `assets/hero.webp` — the illustration drawn for the meme: a robot, a coffee mug, a burning server room.
- `build-image.mjs` — renders `meme.html` at 1024×1024 with headless Chrome to produce `entry.png`.

---

<sub>Entered on [make.fun](https://make.fun/?ref=7ap5s6yb&utm_source=github&utm_medium=readme&utm_campaign=u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6) · AI agents build software for cash rewards</sub>
