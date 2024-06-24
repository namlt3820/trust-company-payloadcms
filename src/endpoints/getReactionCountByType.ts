import { CollectionSlugs } from '@/collections/CollectionSlugs'
import { ErrorMessages } from '@/constants/ErrorMessages'
import { ReactionTypes } from '@/constants/ReactionTypes'
import { isArrayString } from '@/utilities/isArrayString'
import _ from 'lodash'
import type { PayloadHandler } from 'payload/config'
import { Reaction } from 'payload/generated-types'

export type ReactionCountByType = {
  type: 'review' | 'comment'
  id: string
  thumbUp: number
  thumbDown: number
  redHeart: number
  skull: number
  hasReactions?: Reaction[]
}

function countReaction(
  reactions: Reaction[],
  docType: 'review' | 'comment',
  id: string,
  userId: string
) {
  const data: ReactionCountByType = {
    id,
    type: docType,
    thumbUp: reactions.filter(
      ({ target: { value }, type }) =>
        value === id && type === ReactionTypes.ThumbsUp
    ).length,

    thumbDown: reactions.filter(
      ({ target: { value }, type }) =>
        value === id && type === ReactionTypes.ThumbsDown
    ).length,

    redHeart: reactions.filter(
      ({ target: { value }, type }) =>
        value === id && type === ReactionTypes.RedHeart
    ).length,

    skull: reactions.filter(
      ({ target: { value }, type }) =>
        value === id && type === ReactionTypes.Skull
    ).length,

    hasReactions: reactions.filter(
      ({ target: { value }, user }) => value === id && user === userId
    ),
  }

  return data
}

export const getReactionCountByType: PayloadHandler = async (req, res) => {
  const { user, payload } = req
  const userId = user?.id || ''

  try {
    const reactionCountByType: ReactionCountByType[] = []
    if (!req.query) res.json({ reactions: reactionCountByType })

    const { reviews, comments } = req.query

    const uniqueReviews =
      reviews && isArrayString(reviews) ? _.uniq(reviews as string[]) : []

    const uniqueComments =
      comments && isArrayString(comments) ? _.uniq(comments as string[]) : []

    const reactions = await payload.find({
      collection: CollectionSlugs.reactions,
      where: {
        ['target.value']: {
          in: uniqueReviews,
        },
      },
      pagination: false,
      depth: 0,
    })

    if (uniqueReviews.length) {
      for (const review of uniqueReviews) {
        const data = countReaction(reactions.docs, 'review', review, userId)

        reactionCountByType.push(data)
      }
    }

    if (uniqueComments.length) {
      for (const comment of uniqueComments) {
        const data = countReaction(reactions.docs, 'comment', comment, userId)

        reactionCountByType.push(data)
      }
    }

    res.json({ reactions: reactionCountByType })
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : ErrorMessages.UnknownError
    payload.logger.error(message)
    res.json({ error: message })
  }
}
