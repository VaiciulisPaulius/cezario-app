function onSubmit() {
    const inputValue = document.querySelector(".unencrypted-text").value
    let offsetValue = document.querySelector(".offset-text").value

    let type = document.querySelector("#algorithm").value
   // type = parseInt(offsetValue);
    console.log(type)

    offsetValue = parseInt(offsetValue)
    if(type == 1) document.querySelector(".result").innerHTML = cezarioAlgoritmas(inputValue, offsetValue)
    if(type == 2) document.querySelector(".result").innerHTML = cezarioAlgoritmasBeMasyvo(inputValue, offsetValue)
    document.querySelector(".decode").style.display = "block"
}
function onSubmitDecode() {
    const inputValue = document.querySelector(".result").innerHTML
    let offsetValue = document.querySelector(".offset-text").value
    offsetValue = parseInt(offsetValue)
    document.querySelector(".result").innerHTML = cezarioAlgoritmasBeMasyvo(inputValue, -offsetValue)
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
    console.log("asd")
    let newInput = "";
    let possibleChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

    for(let i = 0; i < input.length; i++) {
        let character = input[i];
        let characterIndex = findElement(character, input)
        //console.log(characterIndex)

        let characterOffset;
        if(characterIndex + offset < possibleChars.length)
            characterOffset = possibleChars[findElement(character, possibleChars) + offset]
        else if(characterIndex + offset > possibleChars.length)
            characterOffset = possibleChars[findElement(character, possibleChars) + offset - possibleChars.length]
        else if(characterIndex + offset < 0)
            characterOffset = possibleChars[findElement(character, possibleChars) + offset + possibleChars.length]

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
    if (this.value > 94) {
        this.value = 94
    } else if (this.value < -94)
    this.value = -94

    document.querySelector(".offset-text").innerHTML = this.value;
}