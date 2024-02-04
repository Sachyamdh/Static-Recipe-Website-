document.addEventListener("DOMContentLoaded", function() {
    const recipeImage = document.getElementById("recipeImage");

    async function fetchRecipeImage() {
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json()
            })
            .then(data => {
                const imageUrl = data.meals[0].strMealThumb;
                recipeImage.src = imageUrl;
            })
            .catch(error => console.error("Error fetching API:", error));
    }

    fetchRecipeImage();
    setInterval(fetchRecipeImage, 5000);
    var api = [];

    async function fetchTopPicks() {
        try {
            const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            api.push(data.meals[0]);
            await createAndAppendCards(data.meals[0]);
    
            if (api.length <4) {
                setTimeout(fetchTopPicks, 10);
            }
        } catch (error) {
            console.error("Error fetching API:", error);
        }
    }
    
    fetchTopPicks();
    
    async function createAndAppendCards(item) {
        var container = document.querySelector('.container');
        var card = document.createElement('div');
        card.classList.add('cards');
        var ingredientsList = [];
        for (let i = 1; i <= 9; i++) {
            const ingredient = item[`strIngredient${i}`];
            if (ingredient) {
                ingredientsList.push(`<li>${ingredient}</li>`);
            }
        }
    
        card.innerHTML = `
            <img class="image-cards" src="${item.strMealThumb}" alt="${item.strMeal}">
            <h2>${item.strMeal}</h2>
            <div class="cards-content">
                <h3>Ingredients</h3>
                <ul>
                    ${ingredientsList.join('')}
                </ul>
            </div>
        `;
    
        container.appendChild(card);
    }

    async function searchByCategory(category){
        try{
            const response = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?a=${category}`)
            if(!response.ok){
                throw new Error (`rHTTp error!, Status code :${response.status}`)
            }
            const data = await response.json()
            await createAndAppendCardsTwo(data.meals)
        }catch(error){
            console.log("Error fetching api catch error")
        }
    }

    const indianCategory = document.getElementById("indianCategory");
    const chineseCategory = document.getElementById("chineseCategory");
    const arabianCategory = document.getElementById("arabianCategory");
    const italianCategory = document.getElementById("italianCategory");

    async function createAndAppendCardsTwo(data) {
        try {
            var container = document.querySelector(".containerfour");
            container.innerHTML = '';
            for (let index = 0; index < Math.min(data.length, 8); index++) {
                const item = data[index];
                const card = document.createElement('div');
                card.classList.add('cards');
                var ingredientsList = [];
    
                for (let i = 1; i <= 9; i++) {
                    const ingredient = item[`strIngredient${i}`];
                  
                        ingredientsList.push(`<li>Ingredients</li>`);
                    
                }
                card.innerHTML = `
                    <img class="image-cards" src="${item.strMealThumb}" alt="${item.strMeal}">
                    <h2>${item.strMeal}</h2>
                    <div class="cards-content">
                        <h3>Ingredients</h3>
                        <ul>
                            ${ingredientsList.join('')}
                        </ul>
                    </div>
                `;
                container.appendChild(card);
            }
        } catch (error) {
            console.error(error);
        }
    }
    indianCategory.addEventListener("click", () => searchByCategory('Indian'));
    chineseCategory.addEventListener("click", () => searchByCategory('Chinese'));
    arabianCategory.addEventListener("click", () => searchByCategory('American'));
    italianCategory.addEventListener("click", () => searchByCategory('Italian'));
    frenchCategory.addEventListener("click", () => searchByCategory("french"));
    seafoodCategory.addEventListener("click", () => searchByCategory("mexican"));
    japaneseCategory.addEventListener("click", () => searchByCategory("Japanese"));

    // function getSearchCategory() {
    //     return localStorage.getItem('searchCategory');
    // }
    // const previousSearchCategory = getSearchCategory();
    // console.log(previousSearchCategory)
    // if (previousSearchCategory) {
    //     createAndAppendCardsTwo(previousSearchCategory);
    // }
 
});
