/* In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). Questa funzione accetta un id di una ricetta e deve:
 - Recuperare la ricetta da https://dummyjson.com/recipes/{id}
 - Estrarre la proprietà userId dalla ricetta
 - Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
 - Restituire la data di nascita dello chef */

/* Attualmente, se la prima richiesta non trova una ricetta, la seconda richiesta potrebbe comunque essere eseguita causando errori a cascata.

Modifica getChefBirthday(id) per intercettare eventuali errori prima di fare la seconda richiesta. */

async function getChefBirthday(id) {
    let recipe;
    try {
        const recipeResponse = await fetch(`https://dummyjson.com/recipes/${id}`);
        recipe = await recipeResponse.json();
        if (recipe.message) {
            throw new Error(recipe.message);
        }
    } catch (error) {
        throw new Error("Errore nel recupero della ricetta: " + error.message);
    }

    let user;
    try {
        const userResponse = await fetch(`https://dummyjson.com/users/${recipe.userId}`);
        user = await userResponse.json();
        if (user.message) {
            throw new Error(user.message);
        }
    } catch (error) {
        throw new Error("Errore nel recupero dello chef: " + error.message);
    }

    return dayjs(user.birthDate).format("DD/MM/YYYY");
}

async function logChefBirthday() {
    try {
        const birthday = await getChefBirthday(1);
        console.log("Data di nascita dello chef:", birthday);
    } catch (error) {
        console.error("Errore:", error.message);
    }
}

logChefBirthday();