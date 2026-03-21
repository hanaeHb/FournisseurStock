class FournisseurModels {
    constructor({
                    idFournisseur,
                    nom,
                    email,
                    telephone,
                    adresse,
                    status,
                }) {
        this.idFournisseur = idFournisseur;
        this.nom = nom;
        this.email = email;
        this.telephone = telephone;
        this.adresse = adresse;
        this.status = status;
    }
}

module.exports = FournisseurModels;
