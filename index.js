let mainDataset = [];
let loopDataset = [];

async function getAllWinners() {
    let response = await fetch(
        `https://api.nobelprize.org/v1/prize.json`,
        {
            method: "GET",
        }
    );

    let data = await response.json();
    mainDataset = data.prizes;
    loopDataset = data.prizes;
}

async function main() {
    await getAllWinners();

    const detailsContainer = document.getElementById('details_container');
    const yearInput = document.getElementById('yearinput');
    const categoryInput = document.getElementById('categoryinput');

    yearInput.addEventListener('input', handleFilter);
    categoryInput.addEventListener('input', handleFilter);

    function handleFilter() {
        const yearFilterValue = yearInput.value.trim().toLowerCase();
        const categoryFilterValue = categoryInput.value.trim().toLowerCase();

        // Apply both filters to the loopDataset
        loopDataset = mainDataset.filter(data =>
            data.year.toString().includes(yearFilterValue) &&
            data.category.toLowerCase().includes(categoryFilterValue)
        );

        renderDetails();
    }

    function renderDetails() {
        const htmlElements = loopDataset.map((data) => {
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

    // Initial render
    renderDetails();
}

main();
