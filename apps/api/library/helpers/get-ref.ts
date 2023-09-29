import mongoose from 'mongoose'

/**
 * The function `getRef` returns a schema definition for a reference field in a MongoDB document, with
 * an optional array flag.
 * @param {string} name - The name parameter is a string that represents the name of the referenced
 * model.
 * @param {boolean} [isArray] - The `isArray` parameter is an optional boolean parameter that indicates
 * whether the reference is an array or not. If `isArray` is `true`, it means that the reference is an
 * array of objects. If `isArray` is `false` or not provided, it means that the reference is a single
 * @returns The function `getRef` returns an object with properties `type`, `ref`, and `default`. The
 * `type` property is either an array of `mongoose.Schema.Types.ObjectId` if the `isArray` parameter is
 * `true`, or just `mongoose.Schema.Types.ObjectId` if `isArray` is `false` or not provided. The `ref`
 * property is set to the value of the `
 */
export const getRef = (name: string, isArray?: boolean) => {
  if (isArray)
    return {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: name }],
      unique: true,
      default: [],
    }
  return {
    type: mongoose.Schema.Types.ObjectId,
    ref: name,
    default: null,
  }
}
