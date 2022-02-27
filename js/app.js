

const allPayers = () => {
    toggleSipnner('block');
    document.getElementById('details-container').textContent = '';
    document.getElementById('player-container').textContent = '';
    document.getElementById('female').style.display = 'none';
    document.getElementById('male').style.display = 'none';
    const searchValue = document.getElementById('serach-box').value;
    console.log(searchValue);
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.player == null) {
                console.log('player not found');
                toggleSipnner('none');
                document.getElementById('p').style.display = 'block';
            } else {
                document.getElementById('p').style.display = 'none';
                showPlayerDetails(data.player);
            }
        });
    console.log(url);
}

const showPlayerDetails = (players) => {
    document.getElementById('player-container').textContent = '';
    const parent = document.getElementById('player-container');
    console.log(players);
    let counter = 0;
    for (const player of players) {
        const div = document.createElement('div');
        div.setAttribute('id', `div-${counter}`);
        div.innerHTML = `
        <div class="card border p-5 mb-2">
        <div class="pro-pic">
            <img class="w-50" src="${player.strThumb ? player.strThumb : ''}" alt="">
        </div>
        <h2>Name: ${player.strPlayer}</h2>
        <h5>Country: ${player.strNationality}</h5>
        
            <div class="allbutton">
                <button onclick="deletePlayer('div-${counter}')" class="btn btn-danger">Delete</button>
                <button onclick="details('${player.idPlayer}')" class="btn btn-success">Details</button>
            </div>
    
        </div>`
        counter++;
        parent.appendChild(div);
        toggleSipnner('none');
    }



};

const deletePlayer = (div) => {
    document.getElementById(div).textContent = '';
    // div.style.display = 'none';
};


const details = (playerId) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`;
    toggleSipnner2('block');
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => playerDetails(data.players[0]));
}

const playerDetails = (player) => {
    console.log(player.strPlayer);
    toggleSipnner2('none');
    if (player.strGender == 'Male') {
        document.getElementById('female').style.display = 'none';
        document.getElementById('male').style.display = 'block';
    } else {
        document.getElementById('male').style.display = 'none';
        document.getElementById('female').style.display = 'block';
    }

    document.getElementById('details-container').innerHTML = `
    <div>
                        <img class="w-50" src="${player.strThumb ? player.strThumb : ''}" alt="">
                    </div>
                    <div class="details">
                    <h1>Name: ${player.strPlayer}</h1>
                    <h3>Country: ${player.strNationality}</h3>
                        <p>${player.strDescriptionEN}</p>
                    </div>
    `
}


const toggleSipnner = (displayStyle) => {
    document.getElementById('spinner').style.display = displayStyle;

}
const toggleSipnner2 = (displayStyle) => {
    document.getElementById('spinner2').style.display = displayStyle;

}

