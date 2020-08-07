const dogImageContainer = document.querySelector('#dog-image-container');
const dogBreeds = document.querySelector('#dog-breeds');
const breedDropdown = document.querySelector('select#breed-dropdown');
let dogBreedsArray = [];

fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(response => response.json())
    .then(dogImgs => renderDogImgs(dogImgs.message));

function renderDogImgs(dogImgs) {
    dogImgs.forEach(dogImgUrl => {
        let img = document.createElement('img');
        img.src = dogImgUrl;
        img.style.height = '300px'
        dogImageContainer.append(img);
    });
};

fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(dogBreedData => {
        getDogBreeds(dogBreedData.message)
        turnDogBreedsArrayToHTML(dogBreedsArray)
    });

function turnDogBreedsArrayToHTML(dogBreedsArray) {
    dogBreedsArray.forEach((dogBreed) => {
        let newLi = document.createElement('li');
        newLi.innerText = dogBreed;
        dogBreeds.append(newLi);

        newLi.addEventListener('click', (e) => {
            e.target.style.color = 'red';
        });
    });
};

function getDogBreeds(dogBreedsObject) {
    for (const dogBreed in dogBreedsObject) {
        if (dogBreedsObject[dogBreed].length > 0) {
            dogBreedsObject[dogBreed].forEach((subBreed) => {
                dogBreedsArray.push(`${subBreed} ${dogBreed}`)
            });
        } else {
            dogBreedsArray.push(dogBreed);
        };
    };
};

breedDropdown.addEventListener('change', (e) => {
    dogBreeds.innerHTML = ""
    userSelection = e.target.value;
    let filteredDogBreedsArray = dogBreedsArray.filter(dogBreed => dogBreed.startsWith(userSelection));
    turnDogBreedsArrayToHTML(filteredDogBreedsArray);
});