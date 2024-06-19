const generateHATEOAS = (resource, items) => {
  let stockTotal = 0
  const limitedItems = items.map((element) => {
    stockTotal = stockTotal + element.stock
    return {
      name: element.nombre,
      href: `http://localhost:3000/joyas/${resource}/${element.id}`
    }
  })

  console.log(limitedItems)

  const itemCount = items.length
  const hateoasResponse = {
    total: itemCount,
    stockTotal,
    results: limitedItems
  }

  return hateoasResponse
}

export default generateHATEOAS
