
const merging = (leftBranch, rightBranch): number[] => {
  const resultArray: number[] = []

  // Случай, когда есть массив и в левой части и в правой...
  while (leftBranch.length && rightBranch.length) {
    // Сравниваем первые элементы наших массивов
    if (Number(leftBranch[0]) < Number(rightBranch[0])) {
      // Пушим первый элемент из массива, и заодно удаляем его из левой части...
      const firstElement = Number(leftBranch.shift())
      resultArray.push(firstElement)
    } else {
      const firstElement = Number(rightBranch.shift())
      resultArray.push(firstElement)
    }
  }

  // Случай, когда есть элемент только в левой части...
  // Так как нам не с чем сравнивать, мы просто докидываем по одному элементы в результирующий массив...
  while (leftBranch.length) {
    const firstElement = Number(leftBranch.shift())
    resultArray.push(firstElement)
  }

  // Случай, когда есть элемент только в правой части...
  // Так как нам не с чем сравнивать, мы просто докидываем по одному элементы в результирующий массив...
  while (rightBranch.length) {
    const firstElement = Number(rightBranch.shift())
    resultArray.push(firstElement)
  }

  return resultArray
}

export const sortMergeFunc = (array: (string | number)[]) => {
  if (array.length <= 1) {
    return array.map(Number)
  }

  //   Ищем индекс центра массива, чтобы разбить его на 2 ветки...
  const mid = Math.floor(array.length / 2)
  // Определяем левую ветку...
  const leftArray = array.slice(0, mid)
  // Определяем правую ветку...
  const rightArray = array.slice(mid)
  // Рекурсивно выполняем разделение веток дальше, до момента выхода из рекурсии (верхнее условие о длине массива);
  const leftBranchArray: number[] = sortMergeFunc(leftArray) as number[]
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const rightBranchArray: number[] = sortMergeFunc(rightArray) as number[]

  // Как только будут достигнуты длины массивов 1, идем далее и начинаем сравнение и мердж веток
  return merging(leftBranchArray, rightBranchArray)
}
