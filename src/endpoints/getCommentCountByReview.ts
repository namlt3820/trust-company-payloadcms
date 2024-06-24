import { CollectionSlugs } from '@/collections/CollectionSlugs'
import { ErrorMessages } from '@/constants/ErrorMessages'
import { isArrayString } from '@/utilities/isArrayString'
import _ from 'lodash'
import type { PayloadHandler } from 'payload/config'

export type CommentCountByReview = {
  review: string
  commentCount: number
}

export const getCommentCountByReview: PayloadHandler = async (req, res) => {
  const { payload } = req

  try {
    const commentCountByReview: CommentCountByReview[] = []
    if (!req.query) res.json({ comments: commentCountByReview })

    const { reviews } = req.query

    const uniqueReviews =
      reviews && isArrayString(reviews) ? _.uniq(reviews as string[]) : []

    const commentCount = await payload.find({
      collection: CollectionSlugs.comments,
      where: {
        review: {
          in: uniqueReviews,
        },
      },
      depth: 0,
      pagination: false,
    })

    for (const review of reviews as string[]) {
      commentCountByReview.push({
        review,
        commentCount: commentCount.docs.filter(
          (comment) => comment.review === review
        ).length,
      })
    }

    res.json({ comments: commentCountByReview })
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : ErrorMessages.UnknownError
    payload.logger.error(message)
    res.json({ error: message })
  }
}
