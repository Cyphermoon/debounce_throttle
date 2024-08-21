const result = document.getElementById("result");
const defaultText = document.getElementById("default_text")
const debounceText = document.getElementById("debounce_text")
const throttleText = document.getElementById("throttle_text")

function incrementCount(element) {
    element.textContent = (parseInt(element.innerText) || 0) + 1
}

const updateDebounceText = debounce((text) => {
    incrementCount(debounceText)
})

const updateThrottleText = throttle((text) => {
    incrementCount(throttleText)
})

document.addEventListener("mousemove", (e) => {
    incrementCount(defaultText)
    updateDebounceText()
    updateThrottleText()
})

function debounce(callback, delay = 1000) {
    /*
    The debounce functions returns a callback wrapper function that accepts the argument and calls the callback function
    along with other logic
    */
    let counter = 0
    let timeout;

    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            callback(...args)
            counter++
            console.log("Callback was called " + counter + " times")

        }, delay)
    }

}

function throttle(callback, delay = 1000) {
    let shouldWait = false
    let waitingArgs;

    let timeoutFunc = () => {
        if (waitingArgs === null) {
            shouldWait = false
        } else {
            callback(...waitingArgs)
            waitingArgs = null
            setTimeout(timeoutFunc, delay)
        }
    }

    return (...args) => {
        if (shouldWait) {
            waitingArgs = args
            return
        }

        callback(...args)
        shouldWait = true

        setTimeout(timeoutFunc, delay)

    }
}
