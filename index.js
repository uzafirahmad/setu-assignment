let mainDataset = [];

async function getAllWinners() {
    let response = await fetch(
        `https://api.nobelprize.org/v1/prize.json`,
        {
            method: "GET",
        }
    );

    let data = await response.json();
    mainDataset = data.prizes;
    console.log(mainDataset)
}

async function main() {
    await getAllWinners();

    const detailsContainer = document.getElementById('details_container');

    const htmlElements = mainDataset.map((data) => {
        if (data.laureates && data.laureates.length > 0) {
            const laureatesHtml = data.laureates.map((laureate) => {
                return `<div>Name: ${laureate.firstname} ${laureate.surname}</div>`;
            }).join('');
            return `<div class='details_object'><h3>${data.year}, ${data.category}</h3><div class='details_names'>${laureatesHtml}</div></div><hr></hr>`;
        } else {
            return `<div class='details_object'><h3>${data.year}, ${data.category}</h3></div><hr></hr>`;
        }
    });

    detailsContainer.innerHTML = htmlElements.join('');
}

main();
