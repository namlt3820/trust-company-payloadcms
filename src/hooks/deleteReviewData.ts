import { CollectionSlugs } from '@/collections/CollectionSlugs'
import { AfterDeleteHook } from 'payload/dist/collections/config/types'
import { Review } from 'payload/generated-types'

export const deleteReviewData: AfterDeleteHook<Review> = async ({
  doc,
  req: { payload },
}) => {
  await payload.delete({
    collection: CollectionSlugs.comments,
    where: {
      review: {
        equals: doc.id,
      },
    },
  })

  await payload.delete({
    collection: CollectionSlugs.reactions,
    where: {
      'target.value': {
        equals: doc.id,
      },
      'target.relationTo': {
        equals: CollectionSlugs.reviews,
      },
    },
  })

  await payload.delete({
    collection: CollectionSlugs.reports,
    where: {
      'target.value': {
        equals: doc.id,
      },
      'target.relationTo': {
        equals: CollectionSlugs.reviews,
      },
    },
  })
}
