

const allPayers = () => {
    const searchValue = document.getElementById('serach-box').value;
    console.log(searchValue);
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;

    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data));
    console.log(url);
}