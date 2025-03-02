async function checkGame() {
    let input = document.getElementById("gameInput").value.trim();
    let gameId = extractAppId(input);
    let gameResult = document.getElementById("gameResult");
    let downloadBtn = document.getElementById("downloadBtn");

    console.log("Vnesen ID:", gameId);

    if (!gameId) {
        gameResult.innerText = "Neveljaven Steam ID ali URL!";
        downloadBtn.style.display = "none";
        return;
    }

    try {
        let response = await fetch("games.json");
        if (!response.ok) throw new Error("Napaka pri dostopu do games.json");
        let games = await response.json();

        console.log("Prebrani podatki:", games);

        if (games[gameId]) {
            let game = games[gameId];
            gameResult.innerText = `Najdena igra: ${game.name}`;

            let fileUrl = game.download;
            console.log("Prenosna povezava:", fileUrl);

            downloadBtn.href = fileUrl;
            downloadBtn.setAttribute("download", fileUrl.split("/").pop());
            downloadBtn.style.display = "block";
        } else {
            gameResult.innerText = "Igra ni najdena.";
            downloadBtn.style.display = "none";
        }
    } catch (error) {
        console.error("Napaka pri nalaganju games.json", error);
        gameResult.innerText = "Napaka pri nalaganju iger.";
        downloadBtn.style.display = "none";
    }
}

function extractAppId(url) {
    let match = url.match(/\/app\/(\d+)/) || url.match(/^(\d+)$/);
    return match ? match[1] : null;
}
