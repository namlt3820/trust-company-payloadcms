import { CollectionSlugs } from '@/collections/CollectionSlugs'
import { AfterDeleteHook } from 'payload/dist/collections/config/types'
import { User } from 'payload/generated-types'

export const deleteUserData: AfterDeleteHook<User> = async ({
  doc,
  req: { payload },
}) => {
  const where = {
    user: {
      equals: doc.id,
    },
  }

  await payload.delete({
    collection: CollectionSlugs.comments,
    where,
  })

  await payload.delete({
    collection: CollectionSlugs.reviews,
    where,
  })

  await payload.delete({
    collection: CollectionSlugs.reactions,
    where,
  })

  await payload.delete({
    collection: CollectionSlugs.reports,
    where,
  })
}
