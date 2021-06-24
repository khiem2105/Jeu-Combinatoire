function clone2DArray(a) {
    let cloneArray = new Array()
    for(let i = 0; i < a.length; i++) {
        cloneArray[i] = a[i].map((e) => e)
    }

    return cloneArray
}

a = [[1, 2], [3, 4]]
clone = clone2DArray(a)
clone[1][1] = 0
console.log(clone)
console.log(a)