let conges = JSON.parse(localStorage.getItem('conges')) || [];
let deletedConges = JSON.parse(localStorage.getItem('deletedConges')) || [];
let currentIndex = null;

function goToSec2() {
    document.getElementById("sec1").style.display = "none";
    document.getElementById("sec2").style.display = "block";
    document.getElementById("sec3").style.display = "none";
}

function goToSec1() {
    document.getElementById("sec1").style.display = "block";
    document.getElementById("sec2").style.display = "none";
    document.getElementById("sec3").style.display = "block";
    document.getElementById("deleted-section").style.display = "none";
}

function modifier(i) {
    currentIndex = i;
    const con = conges[i];
    
    document.getElementById("nom").value = con.nom;
    document.getElementById("prenom").value = con.prenom;
    document.getElementById("date_debut").value = con.dateDebut;
    document.getElementById("date_fin").value = con.dateFin;

    goToSec2(); 
}

function ajouter() {
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let dateDebut = document.getElementById("date_debut").value;
    let dateFin = document.getElementById("date_fin").value;

    if (nom && prenom && dateDebut && dateFin) {
        if (currentIndex !== null) {
            conges[currentIndex] = { nom, prenom, dateDebut, dateFin };
            currentIndex = null;
            alert("Congé modifié avec succès !");
        } else {
            conges.push({ nom, prenom, dateDebut, dateFin });
            alert("Congé ajouté avec succès !");
        }

        localStorage.setItem('conges', JSON.stringify(conges));
        afficher();
        goToSec1();

        document.getElementById("nom").value = '';
        document.getElementById("prenom").value = '';
        document.getElementById("date_debut").value = '';
        document.getElementById("date_fin").value = '';
    } else {
        alert("Veuillez remplir tous les champs.");
    }
}

function rechercher() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let filteredConges = conges.filter(con => 
        con.nom.toLowerCase().includes(input) || 
        con.prenom.toLowerCase().includes(input)
    );
    afficher(filteredConges);
}

function afficher(filteredConges = conges) {
    let text = "";
    filteredConges.forEach(function (con, i) {
        text += `
        <tr>
            <td>${i}</td>
            <td>${con.nom}</td>
            <td>${con.prenom}</td>
            <td>${con.dateDebut}</td>
            <td>${con.dateFin}</td>
            <td class="action">
                <button class="R" onclick="supprimer(${i})">supprimer</button>
                <button class="M" onclick="modifier(${i})">modifier</button>
            </td>
        </tr>`;
    });
    document.getElementById("tbody").innerHTML = text;
    updateDeletedCount();
}

function supprimer(i) {
    let deleted = conges.splice(i, 1)[0];
    deletedConges.push(deleted);
    localStorage.setItem('conges', JSON.stringify(conges));
    localStorage.setItem('deletedConges', JSON.stringify(deletedConges));
    afficher();
    afficherDeleted();
}

function updateDeletedCount() {
    let numberDiv = document.querySelector('.number');
    numberDiv.textContent = deletedConges.length;
}

function afficherDeleted() {
    let text = "";
    deletedConges.forEach(function (con, i) {
        text += `
        <tr>
            <td>${i}</td>
            <td>${con.nom}</td>
            <td>${con.prenom}</td>
            <td>${con.dateDebut}</td>
            <td>${con.dateFin}</td>
            <td class="action">
                <button class="Re" onclick="restaurer(${i})">Restaurer</button>
                <button class="Re" onclick="supprimerCompletement(${i})">Supprimer Complètement</button>
            </td>
        </tr>`;
    });
    document.getElementById("deleted-tbody").innerHTML = text;
}

function restaurer(i) {
    const restored = deletedConges.splice(i, 1)[0];
    conges.push(restored);
    localStorage.setItem('conges', JSON.stringify(conges));
    localStorage.setItem('deletedConges', JSON.stringify(deletedConges));
    afficher();
    afficherDeleted();
}

function supprimerCompletement(i) {
    deletedConges.splice(i, 1); 
    localStorage.setItem('deletedConges', JSON.stringify(deletedConges));
    afficherDeleted();
    updateDeletedCount();
}

function goToDeletedSection() {
    document.getElementById("sec1").style.display = "none";
    document.getElementById("sec2").style.display = "none";
    document.getElementById("sec3").style.display = "none";
    document.getElementById("deleted-section").style.display = "block";
}

window.onload = function() {
    afficher();
    afficherDeleted();
};
