export const getTotalCountPanel = (count: number): string[] => {
  const totalCountArray = count.toString().split('')

  if (totalCountArray.length >= 6) {
    return totalCountArray
  }

  const append = new Array(6 - totalCountArray.length).fill('0')

  return append.concat(totalCountArray)
}
