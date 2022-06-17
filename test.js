let arr = [1, 2, 3, 4, 5, 6]
console.log(arr)
arr = arr.reduce((acc, e, i) => {
    if (i === 0) { return acc.concat("First") }
    else { return acc.concat(e) }
}, [])
console.log(arr)