export async function populateUser({ doc, req: { payload } }) {
  if (doc?.user) {
    const userDoc = await payload.findByID({
      collection: 'users',
      id: typeof doc.user === 'object' ? doc?.user?.id : doc?.user,
      depth: 0,
    })

    doc.populatedUser = {
      id: userDoc.id,
      name: userDoc.name,
    }
  }

  return doc
}
