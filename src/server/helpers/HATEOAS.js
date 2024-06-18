const generateHATEOAS = (resource, items) => {
  const limitedItems = items.map((element) => {
    return {
      name: element.name,
      href: `http://localhost:3000/joyas/${resource}/${element.id}`
    }
  })

  console.log(limitedItems)

  const itemCount = items.length
  const hateoasResponse = {
    total: itemCount,
    results: limitedItems
  }

  return hateoasResponse
}

export default generateHATEOAS
