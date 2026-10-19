# The Game Feel Cookbook

20 tiny tricks that make any game feel amazing — with starting values and Godot 4 GDScript.

**Read it here: https://sharik-dev.github.io/game-feel-cookbook/**

From the YouTube channel [Make Money With AI](https://www.youtube.com/@make.money.with.ai.nowwwww).

## Checklist

### PUNCH
- [ ] White flash 50–80 ms on impact
- [ ] Impact sound on the contact frame, pitch 0.9–1.1
- [ ] Directional sparks (8–16, spread 25°)
- [ ] Knockback 350–500 px/s + small player recoil
- [ ] Hit stop 40–90 ms, then trauma-based shake

### JUMP
- [ ] Coyote time 0.10 s
- [ ] Jump buffer 0.12 s
- [ ] Release = velocity.y × 0.5
- [ ] Fall gravity ×2, max fall speed capped
- [ ] Stretch on takeoff, squash on landing, dust

### COIN
- [ ] Spin + bob with random phase
- [ ] Magnet radius 60–100 px, accelerating pull
- [ ] Pop to 1.4× then burst into sparkles
- [ ] +1 semitone per coin in a row (2^(n/12))
- [ ] Fly to the counter + counter bounce

### DASH
- [ ] Anticipation squash ≤ 80 ms, stretch along the dash
- [ ] Afterimages every 30 ms, fade in 0.2 s
- [ ] FOV kick +15° (or zoom 0.92) and speed lines
- [ ] Hit stop + shake on contact
- [ ] Skid to a stop + dust instead of a hard stop

## Shorts
- **PUNCH** — [Make hits punchy](https://www.youtube.com/shorts/i4-udz0FEZY)
- **JUMP** — [Make jumps feel good](https://www.youtube.com/shorts/WNxWsPB64Gc)
- **COIN** — [Make coin pickups feel good](https://www.youtube.com/@make.money.with.ai.nowwwww/shorts)
- **DASH** — [Make dashes feel good](https://www.youtube.com/@make.money.with.ai.nowwwww/shorts)

Code snippets are MIT licensed. No cookies, no tracking.
