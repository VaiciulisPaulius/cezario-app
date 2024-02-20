let numLimit = 94

function onSubmit() {
    const inputValue = document.querySelector(".unencrypted-text").value
    let offsetValue = document.querySelector(".offset-text").value

    let type = document.querySelector("#algorithm").value

    offsetValue = parseInt(offsetValue)
    if(type == 1) document.querySelector(".result").innerHTML = cezarioAlgoritmas(inputValue, offsetValue)
    if(type == 2) document.querySelector(".result").innerHTML = cezarioAlgoritmasBeMasyvo(inputValue, offsetValue)

    document.querySelector(".decode").style.display = "block"
}
function onSubmitDecode() {
    const inputValue = document.querySelector(".result").innerHTML
    let offsetValue = document.querySelector(".offset-text").value

    let type = document.querySelector("#algorithm").value

    offsetValue = parseInt(offsetValue)
    if(type == 1) document.querySelector(".result").innerHTML = cezarioAlgoritmas(inputValue, -offsetValue)
    if(type == 2) document.querySelector(".result").innerHTML = cezarioAlgoritmasBeMasyvo(inputValue, -offsetValue)

    document.querySelector(".decode").style.display = "none"
}

function cezarioAlgoritmasBeMasyvo(input, offset) {
    let newText = ""
    for(let i = 0; i < input.length; i++) {
        let characterNum = input.charCodeAt(i);
        let characterOffsetNum = input.charCodeAt(i) + offset

        if(characterOffsetNum > 126)
            characterOffsetNum = characterOffsetNum - 127 + 32
        else if(characterOffsetNum < 32)
            characterOffsetNum = characterOffsetNum + 127 - 32

        newText += String.fromCharCode(characterOffsetNum)
    }
    return newText
}
function cezarioAlgoritmas(input, offset) {
    let newInput = "";
    let possibleChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

    console.log(possibleChars.length)

    for(let i = 0; i < input.length; i++) {
        let character = input[i];
        let characterIndex = findElement(character, possibleChars)
        console.log(findElement(character, possibleChars) + " + " + offset + " < " + possibleChars.length)

        let characterOffset;
        if(characterIndex + offset < possibleChars.length && characterIndex + offset > 0)
            characterOffset = possibleChars[findElement(character, possibleChars) + offset]
        else if(characterIndex + offset >= possibleChars.length)
            characterOffset = possibleChars[findElement(character, possibleChars) + offset - possibleChars.length]
        else if(characterIndex + offset < 0)
            characterOffset = possibleChars[findElement(character, possibleChars) + offset + possibleChars.length]

        console.log(possibleChars[findElement(character, possibleChars) + offset])

        newInput += characterOffset
    }
    return newInput
}
function findElement(el, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === el) return i;
    }
    return;
}
document.querySelector(".offset-text").oninput = function () {
    let type = document.querySelector("#algorithm").value

    if(type == 1) numLimit = 62
    if(type == 2) numLimit = 94

    if (this.value > numLimit) {
        this.value = numLimit
    } else if (this.value < -numLimit)
    this.value = -numLimit

    document.querySelector(".offset-text").innerHTML = this.value;
}