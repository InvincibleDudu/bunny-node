function createPhoneNumber(numbers: number[]) {
   // createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) // => returns "(123) 456-7890"
   return numbers.map((item, index) => {
      if (index < 3) {
         if (index === 0) return '(' + item
         if (index === 2) return item + ') '
         return item
      }
      if (index === 5) return item + '-'
      return item
   }).join('')
}

// console.log(createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]))


function alphabetPosition(text: string) {
   // Input = "The sunset sets at twelve o' clock."
   // Output = "20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5 15 3 12 15 3 11"
   function isLetter(c: string) {
      return c.toLowerCase() != c.toUpperCase();
   }

   let result = ''
   for (const char of text) {
      if (isLetter(char)) result += char.toLowerCase().charCodeAt(0) - 96 + ' '
   }
   return result.trim()
}

// console.log(alphabetPosition("The sunset sets at twelve o' clock."))

function duplicateEncode(word: string) {
   let result = ''
   word = word.toLowerCase()
   for (let i = 0; i < word.length; i++) {
      const char = word[i]
      const otherChar = word.substring(0, i) + word.substring(i + 1, word.length)
      if (otherChar.includes(char)) result += ')'
      else result += '('
   }
   return result
}

function duplicateEncode2(word: string) {
   word = word.toLowerCase()
   let result = word

   for (let i = 0; i < word.length; i++) {
      const char = word[i]
      if (char === '(' || char === ')') continue
      const otherChar = word.substring(0, i) + word.substring(i + 1, word.length)
      if (otherChar.includes(char)) result = result.replace(char, ')')
      else result = result.replace(char, '(')
   }
   return result
   // verdict: faster but doesnt work
}

// console.log(duplicateEncode2('REcede'))

export const productFib = (prod: number) => {
   // 714 ---> (21, 34, true)
   // --> since F(8) = 21, F(9) = 34 and 714 = 21 * 34
   //
   // 800 --->  (34, 55, false)
   // --> since F(8) = 21, F(9) = 34, F(10) = 55 and 21 * 34 < 800 < 34 * 55
   // function findFibs(max: number) {
   //     const res = [0, 1, 1]
   //     for (let i = 2; i < max; i++) {
   //         if (i === ((res.at(-1)) + (res.at(-2)))) res.push(i)
   //     }
   //     return res
   // }
   function findFibs(maxProduct: number) {
      const res = [0, 1, 1]
      // @ts-ignore
      for (let i = 2; res.at(-1) * res.at(-2) < maxProduct; i++) {
         // @ts-ignore
         if (i === res.at(-1) + res.at(-2)) res.push(i)
      }
      return res
   }

   const fibs = findFibs(prod)
   if (!fibs.at(-2) || !fibs.at(-1)) return [-1, -1, false]
   // @ts-ignore
   return [fibs.at(-2), fibs.at(-1), (fibs.at(-1) * fibs.at(-2) === prod)]
}

// console.log(productFib(800))


export function alphanumeric(string: string): boolean {
   //    doTest("Mazinkaiser", true);
   //     doTest("hello world_", false);
   //     doTest("", true);
   //     doTest("     ", false);
      if (!string.length) return false
   for (const char of string) {
      const c = char.charCodeAt(0)
      console.log(c)
      if (!((c > 47 && c < 58) || (c > 64 && c < 91) || (c > 96 && c < 123))) return false
   }
   return true
}

// console.log(alphanumeric(''))

export default function add(x: number): Function {
   return add(x)
}
// console.log(add(1)(2))


//9. 公鸡一个五块钱，母鸡一个三块钱，小鸡三个一块钱，现在要用一百块钱买一百只鸡，问公鸡、母鸡、小鸡各多少只？
// 注： 一百块钱全部用完，刚好买一百只鸡；求出所有解（使用代码方式）

function buy () {
   const mPrice = 5
   const fPrice = 3
   const cPrice = 1 / 3

   const count = 100
   const money = 100
   const result = []

   // m + f + c = 100
   // 5m + 3f + 0.33c = 100
   // 5m + 3f + 0.33c = m + f + c
   // 4m+2f-0.67c = 0
   for (let m = 0; m < 20; m++) {
      for (let f = 0; f < 33; f++) {
         for (let c = 0; c < 300; c++) { // this could be optimized
            if ((4 * m) + (2 * f) - ((2 / 3) * c) === 0 && (m + f + c === 100)) console.log(m, f, c)
         }
      }
   }

   // for (let m = money / mPrice; m >= 0 ; m--) {
   //    if ()
   // }

   // return result
}

buy()

//给定一个数组 prices，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。 你可以选择某一天买入这只股票，并选择在未来的某一个不同的日子卖出该股票。设计一个算法来计算所能获取的最大利润，如果不能获取任何利润，返回 0 。
// 示例 1： 输入：[7,1,5,3,6,4] 输出：5
// 示例 2： 输入：prices = [7,6,4,3,1] 输出：0
function stock (arr: number[]) {
   let lowest = arr[0]
   let margin = 0
   for (let i = 1; i < arr.length; i++){
      const number = arr[i]
      if (number < lowest) {
         lowest = number
      } else if ((number - lowest) > margin) {
         margin = number - lowest
      }
   }
   return margin
}

// console.log(stock([7,1,5,3,6,4]))
// console.log(stock([7,1,5,3,6,4,6,10,3,5]))

//10. 观测下面的图形，找出规律，写出程序，计算第m行第n列的数值
function getRes (m: number, n: number): number {
   if (n === 1 || m === n) return 1
   // getRes(m, n) === getRes(m-1, n-1) + getRes(m-1, n+1)
   return getRes(m - 1, n - 1) + getRes(m - 1, n)
}

// console.log(getRes(6, 3))

// 11. 输入两个正整数m和n，编写程序计算其最大公约数和最小公倍数
function getNumbers (m: number, n: number) {
   function getLargest (m: number, n: number) {
      let a
      while (n > 0) {
         a = m % n
         m = n
         n = a
      }
      return m
   }
   return [getLargest(m, n), (m * n) / getLargest(m, n)]
}

// console.log(getNumbers(14, 6))


/**
 * 有一个n阶的楼梯，一个人从楼梯底部开始上楼梯，这个人一次上 1 阶楼梯或2阶楼梯，
 * 那么这个人从楼梯底部，走到楼梯顶部有多少中方式？
 */

function stairs (n: number): number {
   const res = 0
   if (n === 1 || n === 2) return n
   return stairs(n - 1) + stairs(n - 2)
}

console.log(stairs(5))


/**
 * 矩阵转置，将一个m*n的矩阵，转置为 n*m矩阵，例如：
 * [[1,2,3,4],
 *  [5,6,7,8]
 *  [9,10,11,12]
 *  ]=>[
 *  [1,5,9],
 *  [2,6,10],
 *  [3,7,11],
 *  [4,8,12]]
 *
 */

function convertMatrix (arr: Array<number[]>) {
   const res = []
   for (let i = 0; i < arr[0].length; i++) {
      const subArr = []
      for (const e of arr) {
         subArr.push(e[i])
      }
      res.push(subArr)
   }
   return res
}
// console.log(convertMatrix([[1,2,3,4],[5,6,7,8],[9,10,11,12]]))