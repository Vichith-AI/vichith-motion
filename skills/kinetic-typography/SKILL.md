---
name: kinetic-typography
description: Generates high-impact kinetic typography, word-level reveals, speech-locked captions, and slot-wheel animations with Indic Akshara syllable safety. Use when animating titles, captions, dynamic lower-thirds, or spoken voiceover subtitles.
license: Apache-2.0
---

# Kinetic Typography

Design structured typography animations that sync cleanly with voiceover cadences and preserve multilingual script integrity.

## 1. Typographic Scale Ladders

To maintain legibility across vertical (9:16) and widescreen (16:9) formats, text size is defined as a fraction of total viewport height:

- **Display**: `0.08` to `0.12` frame height (14–20 characters per line max)
- **Headline**: `0.05` to `0.07` frame height (24–32 characters per line max)
- **Subhead**: `0.035` to `0.045` frame height (36–44 characters per line max)
- **Caption / Body**: `0.024` to `0.032` frame height (40–50 characters per line max)
- **Badge / Tag**: `0.018` to `0.025` frame height (12–18 characters per line max)

## 2. Animation Primitives

Text behaviors accept modular entrance, emphasis, and exit configurations:

- `fade_rise`: Characters or words elevate 24px upwards while fading in smoothly.
- `roll_in`: Vertical 3D drum rotation where words snap onto the baseline like a slot wheel.
- `highlight_wipe`: A high-contrast color block sweeps horizontally across selected hero words.
- `pop_in`: Fast scale pop with slight elastic rebound on focal keywords.
- `typewriter`: Sequential character reveal with optional blinking vertical cursor (`|`).

See [Animation Primitives Reference](references/animation-primitives.md) for full parameter definitions.

## 3. Speech-Locked Synchronization (`syncTo: "speech"`)

When aligning captions with real voiceover or STT transcripts, avoid arbitrary uniform staggers. Bind word reveal timestamps directly to audio speech boundaries via `spokenWords`:

1. Extract word-level start and end timestamps from speech recognition data.
2. Provide `syncTo: "speech"` in the typography configuration.
3. Each word activates at its exact spoken timestamp (`startSecs`), switching into full opacity or accent emphasis.

## 4. Indic Akshara Syllable Integrity

Standard character-splitting algorithms break Indian scripts (Devanagari, Telugu, Tamil, Bengali, Kannada) by splitting vowel matras and conjunct consonants from their base characters.

The typography engine applies linguistic Akshara grapheme cluster rules:
- **Consonant + Halant/Virama + Consonant** sequences are preserved as single indivisible animated units.
- **Vowel signs and anusvaras** remain bonded to the preceding consonant.

## 5. Declarative MotionSpec Example

```json
{
  "$schema": "https://vichith.in/schemas/motion-spec.json",
  "layer": "headline-callout",
  "type": "text",
  "text": "Autonomous video editing with agentic intelligence",
  "behavior": {
    "unit": "word",
    "enter": "roll_in",
    "emphasis": "highlight_wipe",
    "highlightColor": "#38bdf8",
    "staggerSecs": 0.07,
    "syncTo": "speech",
    "spokenWords": [
      { "text": "Autonomous", "startSecs": 0.12, "endSecs": 0.54 },
      { "text": "video", "startSecs": 0.58, "endSecs": 0.88 },
      { "text": "editing", "startSecs": 0.92, "endSecs": 1.34 },
      { "text": "with", "startSecs": 1.38, "endSecs": 1.55 },
      { "text": "agentic", "startSecs": 1.60, "endSecs": 2.05 },
      { "text": "intelligence", "startSecs": 2.10, "endSecs": 2.68 }
    ]
  }
}
```
