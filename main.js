/* In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). Questa funzione accetta un id di una ricetta e deve:
 - Recuperare la ricetta da https://dummyjson.com/recipes/{id}
 - Estrarre la proprietà userId dalla ricetta
 - Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
 - Restituire la data di nascita dello chef */

async function getChefBirthday(id) {

    const recipeResponse = await fetch(`https://dummyjson.com/recipes/${id}`);
    const recipe = await recipeResponse.json();

    const userId = recipe.userId;

    const userResponse = await fetch(`https://dummyjson.com/users/${userId}`);
    const user = await userResponse.json();

    return user.birthDate;
}

async function logChefBirthday() {
    const birthday = await getChefBirthday(1);
    console.log("Compleanno dello chef:", birthday);
}

logChefBirthday();