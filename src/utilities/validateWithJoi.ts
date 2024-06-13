import Joi from 'joi'

export const checkSchema = (val: any, schema: Joi.Schema) => {
  const { error } = schema.validate(val)

  return error ? error.message : true
}
