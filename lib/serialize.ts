export function serializeDocument<T extends { _id?: { toString(): string } }>(
  doc: T | null
) {
  if (!doc) {
    return null;
  }

  return JSON.parse(
    JSON.stringify({
      ...doc,
      _id: doc._id?.toString?.()
    })
  ) as T;
}

export function serializeDocuments<T extends { _id?: { toString(): string } }>(
  docs: T[]
) {
  return docs.map((doc) => serializeDocument(doc)) as T[];
}
