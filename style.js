document.addEventListener("DOMContentLoaded", function () {
    const scrollingTextContainer = document.querySelector(".scrollingTextContainer");

    function generateRandomBinary() {
        return Math.round(Math.random());
    }

    function generateRandomBinaryString(length) {
        let binaryString = "";
        for (let i = 0; i < length; i++) {
            binaryString += generateRandomBinary();
        }
        return binaryString;
    }

    function updateScrollingText() {
        const binaryString = generateRandomBinaryString(10000); // Change the length as needed
        scrollingTextContainer.innerText = binaryString;
    }

    setInterval(updateScrollingText, 100);
});
