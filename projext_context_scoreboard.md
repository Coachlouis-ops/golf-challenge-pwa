# Golf Competition & Live Leaderboard System

## Project Update — Current Progress

### Completed

# System Architecture Established

The platform has now been successfully split into:

### 1. Teez Golf Challenges

Consumer/player system:

* player-vs-player challenges
* rankings
* wallets
* rewards
* challenge history

### 2. Teez Golf Scoring

Club/tournament competition system:

* club competitions
* live scoring
* realtime leaderboards
* TV leaderboard broadcasting
* tournament management

Both systems operate inside the SAME Firebase project.

---

# Scoring Club Authentication System — Completed

## Admin Controlled Club Registration

Scoring club accounts are now structured as:

### Firebase Authentication

Created through admin-controlled creation flow.

### Firestore Collection

```text
scoringClubs/{uid}
```

### Firestore Structure

```json
{
  "clubName": "",
  "email": "",
  "active": true,
  "role": "scoringClub",
  "createdAt": ""
}
```

---

# Scoring Login System — Completed

## Login Route

```text
/teez-scoring/login
```

## Authentication

Uses:

* Firebase Email/Password Authentication

## Validation

After login:

* validates scoringClubs/{uid}
* validates active = true
* validates role = scoringClub

---

# Navigation System — Fixed

## Issue Resolved

The Teez Golf Scoring button on the main systems page was incorrectly routing directly to:

```text
/teez-scoring
```

instead of:

```text
/teez-scoring/login
```

This has now been corrected.

---

# Scoring Dashboard — Operational

Dashboard route:

```text
/teez-scoring
```

Dashboard sections now active:

* Create Competition
* Live Leaderboards
* TV Display

---

# Current Operational Flow

## Working Flow

Main Systems Page →

Teez Golf Scoring →

Scoring Login →

Authentication →

Scoring Dashboard

---

# Competition Engine Architecture — Defined

## Competition Structure

The scoring system will operate using a flexible scorer-controlled architecture.

The system is intentionally designed to behave like a real-world golf club scoring desk rather than a rigid tournament engine.

---

# Competition Creation Flow

## Competition Setup

Scorers/staff create the competition shell first.

### Competition Setup Includes

* competition name
* competition format
* scoring format
* player configuration
* divisions
* tee times
* starting holes

---

# Competition Formats

Supported formats:

* Stroke Play
* Stableford
* IPS
* Matchplay
* Scramble
* Betterball
* Fourball Alliance

---

# Player Configuration Types

Supported player configurations:

* Singles
* Doubles
* Foursomes

---

# Division System

Competition can support:

* no divisions
* A Division
* B Division
* C Division
* D Division

Leaderboard system must support:

* global leaderboard
* division-specific leaderboards

---

# Group & Tee Time Architecture

## Group Structure

Groups are operational only.

Example:

```text
GROUP 1 — 07:10

Louis / Andries
John / Peter
```

Each scoring row represents a scoring entity/team.

The leaderboard itself remains global.

---

# Flexible Scoring Architecture

## Important Design Principle

The system must allow:

* incomplete groups
* editable pairings
* editable names
* editable scoring rows
* moving players between groups
* late pair confirmations
* partial score entry

This mirrors real golf club operations.

---

# Player Entry Structure

Players are manually entered by scorers.

Each player/scoring row contains:

* editable display name
* assigned division
* tee time
* starting hole
* score

No rigid player account linking required.

---

# Scoring Logic

## Final Totals Entry

Initial MVP scoring uses:

* final totals only

No hole-by-hole scoring initially.

---

# Score Entry Structure

Scorers manually enter:

* final score
* final points
* final result

based on the competition scoring format selected during competition creation.

The scoring engine does NOT enforce pairing validation.

The scorer controls the final scoring interpretation.

---

# Leaderboard Architecture

## Manual Recalculation System

Leaderboard updates occur only when:

```text
UPDATE LEADERBOARD
```

is pressed.

The system then:

* recalculates the full leaderboard
* recalculates all positions
* recalculates movement
* rebuilds division leaderboards

---

# Leaderboard Display

Leaderboard rows display:

* position
* display name
* division
* score/result
* movement

---

# Current Firebase Collections

Planned collections:

* scoringClubs
* competitions
* competitionPlayers
* competitionScores
* competitionLeaderboard
* competitionEvents

---

# NEXT BUILD STAGE

# Competition Creation Engine

## Immediate Next Objective

Build:

```text
/teez-scoring/create-competition
```

---

# MVP Priority

The current focus remains:

* realtime competition scoring
* realtime leaderboard updating
* realtime TV leaderboard broadcasting

Before:

* AI systems
* GPS systems
* streaming integrations
* advanced hardware integrations

This remains the operational core of the platform.
