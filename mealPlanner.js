// Get the form elements
let calorieCounter = document.getElementById("calorie-counter");
let mealCounter = document.getElementById("meal-counter");
let category = document.getElementById("category");
let diet = document.getElementById("diet");
let submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", function (e) {
    e.preventDefault(); // prevent default behavior
    // Get the user's calorie requirement and selected categories and diets
    let calorieRequirement = calorieCounter.value;
    let mealCount = mealCounter.value;
    let selectedCategories = [];
    let selectedDiets = [];
    for (let i = 0; i < category.options.length; i++) {
        if (category.options[i].selected) {
            selectedCategories.push(category.options[i].value);
        }
    }
    for (let i = 0; i < diet.options.length; i++) {
        if (diet.options[i].selected) {
            selectedDiets.push(diet.options[i].value);
        }
    }
    // Read the saved JSON file
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "DishesCalories.json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);

            let selectedDishes = {};
            let totalCal = {}
            let availableDishes = {};
            for (let catNum = 0; catNum < selectedCategories.length; catNum++) {
                availableDishes[selectedCategories[catNum]] = [];
                for (let dietNum = 0; dietNum < selectedDiets.length; dietNum++) {
                    let categoryDishes = data[selectedCategories[catNum]][selectedDiets[dietNum]];
                    for (let k = 0; k < categoryDishes.length; k++) {
                        let dish = categoryDishes[k];
                        dish["diet"]=selectedDiets[dietNum]
                        if (dish.calories <= calorieRequirement) {
                            availableDishes[selectedCategories[catNum]].push(dish);
                        }
                    }
                }
            }
            let availableCalorie = calorieRequirement
            while (availableCalorie > 0) {
                for (let mealNum = 0; mealNum < mealCount; mealNum++) {
                    let catPos = mealNum % (selectedCategories.length) || 0
                    let catType = selectedCategories[catPos]
                    let dishes = availableDishes[catType]
                    let randomIndex = Math.floor(Math.random() * dishes.length) || 0;
                    let randomDish = dishes[randomIndex];
                    selectedDishes[mealNum] = [...selectedDishes[mealNum] || [], randomDish];
                    totalCal[mealNum] = (totalCal[mealNum] || 0) + randomDish.calories
                    availableCalorie -= randomDish.calories
                    if(availableCalorie < 0){
                        break;
                    }
                }
            }

            // Check if there are any dishes that meet the user's requirements
            if (Object.keys(selectedDishes).length === 0) {
                alert("Sorry, we could not find any dishes that meet your calorie requirement and food diet preference in the selected categories and diets. Please try again with different options.");
            } else {
                console.log(selectedDishes)

                let mealPlans = document.getElementById("meal-plans");
                mealPlans.innerHTML = "";
                let mealstitle = document.createElement("h1");
                mealstitle.innerHTML = `Here are some meal plans for you!`;
                mealPlans.appendChild(mealstitle)

                for (let mealNum = 0; mealNum < mealCount; mealNum++) {
                    let catPos = mealNum % (selectedCategories.length) || 0
                    let catType = selectedCategories[catPos]
                    let mealsArr = selectedDishes[mealNum]
                    let totalCalories = totalCal[mealNum]
                    // Define the container element for the meal plan
                    let mealContainer = document.createElement("div");
                    mealContainer.classList.add("meal-container");
                    mealContainer.classList.add(catType.toLowerCase());

                    // Create the main meal type element
                    let mainMealType = document.createElement("div");
                    let mainMealTypeText = document.createElement("span");
                    mainMealTypeText.classList.add("meal-main-type");
                    mainMealTypeText.innerHTML = catType;
                    mainMealType.appendChild(mainMealTypeText);

                    // Create the main meal calories element
                    let mainMealCalories = document.createElement("sup");
                    mainMealCalories.classList.add("meal-calories");
                    mainMealCalories.innerHTML = `   ${totalCalories} Calories`;
                    mainMealType.appendChild(mainMealCalories);
                    mealContainer.appendChild(mainMealType);

                    // Create the meals container
                    let meals = document.createElement("div");
                    meals.classList.add("meals");

                    mealsArr.forEach(function (meal) {
                        let mealElem = document.createElement("div");
                        mealElem.classList.add("meal");
                        if(meal.diet == "Vegetarian"){
                            mealElem.classList.add("veg-meal");
                        }else{
                            mealElem.classList.add("non-veg-meal");
                        }
                        let mealName = document.createElement("div");
                        let mealNameText = document.createElement("span");
                        mealNameText.classList.add("meal-type");
                        mealNameText.innerHTML = meal.name;
                        mealName.appendChild(mealNameText);
                        let mealCalories = document.createElement("sup");
                        mealCalories.classList.add("meal-calories");
                        mealCalories.innerHTML = `   ${meal.calories} Calories`;
                        mealName.appendChild(mealCalories);
                        mealElem.appendChild(mealName);
                        meals.appendChild(mealElem);
                    });
                    mealContainer.appendChild(meals);

                    // Append the meal plan to the document
                    mealPlans.appendChild(mealContainer);

                }
            }

        };
    }
    xhr.send();
});
