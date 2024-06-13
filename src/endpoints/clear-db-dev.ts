import { CollectionSlugs } from '@/collections/CollectionSlugs'
import { Environments } from '@/constants/Environments'
import { ErrorMessages } from '@/constants/ErrorMessages'
import type { PayloadHandler } from 'payload/config'

const collections = [CollectionSlugs.users]

export const clearDBDev: PayloadHandler = async (req, res): Promise<void> => {
  const { user, payload } = req

  if (process.env.NODE_ENV !== Environments.development) {
    res.status(400).json({ error: ErrorMessages.WrongEnvironment })
    return
  }

  if (!user) {
    res.status(401).json({ error: ErrorMessages.Unauthorized })
    return
  }

  try {
    payload.logger.info(`— Clearing collections and globals...`)
    await Promise.all([
      ...collections.map(async (collection) =>
        payload.delete({
          collection,
          where: {},
        })
      ),
    ])
    res.json({ success: true })
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : ErrorMessages.UnknownError
    payload.logger.error(message)
    res.json({ error: message })
  }
}
