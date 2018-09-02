let reg1 = /^\w+@\w+\.com$/
let ans_1_1 = reg1.test('550284315@qq.com')
let ans_1_2 = reg1.test('550284315qq.com')
console.log(ans_1_1, ans_1_2)

let reg2 = /^[1-9]+-[1-9]+/
let ans_2_1 = reg2.test('86-15756307912')
let ans_2_2 = reg2.test('xd-2333')
console.log(ans_2_1, ans_2_2)

let reg3 = new RegExp('hi[1-9]*','g')
let ans_3_1 = reg3.exec('hi2 Im doge , hi -2333')
let ans_3_2 = 'hi2333 hi3222'.match(reg3)
let ans_3_3 = 'h-i2333 hi3222 hi2333'.search(reg3) //return the first target's location
let ans_3_4 = 'hi2333 hi3222'.replace(reg3, 'ok')
console.log(ans_3_1, ans_3_2, ans_3_3, ans_3_4)
