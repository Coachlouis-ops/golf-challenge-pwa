export function playerVerifiedForRevision(
  player: { resultVerified: boolean; verifiedRevision: number | null },
  resultsRevision: number
): boolean {
  if (!player.resultVerified) return false;
  if (
    resultsRevision > 0 &&
    player.verifiedRevision != null &&
    player.verifiedRevision !== resultsRevision
  ) {
    return false;
  }
  return true;
}
