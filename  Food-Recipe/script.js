const mealsEl = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");
const mealPopup = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

getRandomMeal(); //get the random meals everytime we referesh
fetchFavMeals(); //the favorite meals section is displyed in the feild
 
//get the ramdom meal
async function getRandomMeal() {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");//data is fetched
    const respData = await resp.json();
    const randomMeal = respData.meals[0];//its data we fetch is wrk in postman then it shows what it has, its has meals we select meals index num 0.
    addMeal(randomMeal, true);
}

async function getMealByID(id){//search by id
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);//whatever in id is mention here
    const respData = await resp.json();
    const meal = respData.meals[0];

    return meal;

}

async function getMealsBySearch(term) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term);
    const respData = await resp.json();
    const meals = respData.meals; //return all the meals
    return meals;
}

function addMeal(mealData,random=false){ //its add a meal header for random reciepe we are fetching and adding to html
    console.log(mealData);

    
    const meal = document.createElement("div");
    meal.classList.add("meal");

    meal.innerHTML = `
        <div class="meal-header">
            ${random
            ? `
            <span class="random"> Random Recipe </span>`
            : ""
        }
            <img
                src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}"
            />
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
        `;

    const btn = meal.querySelector(".meal-body .fav-btn");

    btn.addEventListener("click", () => { // its for add or remove the favortie part
        if (btn.classList.contains("active")) {
            removeMealLS(mealData.idMeal);
            btn.classList.remove("active");
        }
        else {
            addMealLS(mealData.idMeal);
            btn.classList.add("active");
        }
        fetchFavMeals();
    });

    meal.addEventListener("click", () => { //its shows meal data when click on mouse
        showMealInfo(mealData);
    });
    mealsEl.appendChild(meal);
}

function addMealLS(mealId) {
    const mealIds = getMealsLS(); ///its used to add the data in ls

    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
    console.log(mealId);
}

function removeMealLS(mealId) {
    const mealIds = getMealsLS();//remove from ls

    localStorage.setItem("mealIds", JSON.stringify(mealIds.filter((id) => id !== mealId)));
}  

function getMealsLS() { //it used to get the meals from ls
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));

    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() { //its fetch from ls and display it application
    //clean the container
    favoriteContainer.innerHTML = "";

    const mealIds = getMealsLS();

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        meal = await getMealByID(mealId);

        addMealFav(meal);
    }
}

function addMealFav(mealData) {
    const favMeal = document.createElement("li");

    favMeal.innerHTML = `
    <img
       src="${mealData.strMealThumb}"
       alt="${mealData.strMeal}"
    />
    <span>${mealData.strMeal}</span>
    <button class="clear"><i class="fas fa-window-close"></i></button>
    `;

    const btn = favMeal.querySelector(".clear");

    btn.addEventListener("click", () => {
        removeMealLS(mealData.idMeal); //on click the btn it remove from favorites and localstorage

        fetchFavMeals();
    });

    favMeal.addEventListener("click", () => {
        showMealInfo(mealData); //onclick of favorite feild image or letter it shows the details
    });

    favoriteContainer.appendChild(favMeal); //add the favmeal in the favcontainer

}
function showMealInfo(mealData) { //it shows the meal info

    //clean it up
    mealInfoEl.innerHTML = "";

    //update the Meal Info

    const mealEl = document.createElement('div');

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (mealData["strIngredient" + i]) {
            ingredients.push(
                `${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`
            );


        }
        else {
            break;
        }
    }

    mealEl.innerHTML = `
    <h1>${mealData.strMeal}</h1>
    <img
        src="${mealData.strMealThumb}"
        alt="${mealData.strMeal}"
    />

    <p>
      ${mealData.strInstructions}
    </p>

    <h3>Ingredients:</h3>
    <ul>
      ${ingredients.map((ing) => `
          <li>${ing}</li>
          `
    ).join("")}
    </ul>
    `;

    mealInfoEl.appendChild(mealEl);
    mealPopup.classList.remove("hidden"); 

}

searchBtn.addEventListener("click", async () => {
    //clean container
    mealsEl.innerHTML = "";

    const search = searchTerm.value;
    const meals = await getMealsBySearch(search);//list of api stored in meals


    if (meals) {
        meals.forEach((meal) => {
            addMeal(meal);
        })
    }
});

popupCloseBtn.addEventListener("click", () => {
    mealPopup.classList.add("hidden"); //on click of it add the hidden
});

