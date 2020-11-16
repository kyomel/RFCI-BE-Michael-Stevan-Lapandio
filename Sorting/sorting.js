// bubble sort [ 4 9 7 5 8 9 3 ]

const bubble = (arr, counter) => {
    console.log(counter)
    const len = arr.length 
    for(let i = 0; i < len; i++) {
        if (arr[i] > arr[i+1]) {
            let [before, after] = arr.slice(i, i + 2)
            arr[i] = after
            arr[i + 1] = before
            console.log(`[${after} ${before}] ->`, arr.join(' '))
            return bubble(arr, counter + 1)
        }
        else if (i == len - 1) {
            return counter
        }
    }
}

console.log(bubble([4, 9, 7, 5, 8, 9, 3], 0))