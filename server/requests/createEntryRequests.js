
const createEntryRequests = (body) => {
  const { calories, food, price } = body
  switch (true) {
    case !calories:
      return [422, "Calories field is required"]
    case !food:
      return [422, "Food field is required"]
    case !price:
      return [422, "Price field is required"]
    default:
      return
  }
}


module.exports = createEntryRequests
