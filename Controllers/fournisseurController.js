const db = require("../db")

/**
 * GET ALL FOURNISSEURS
 */
exports.getAll = async (req, res) => {
    try {

        const result = await db.query("SELECT * FROM fournisseurs ORDER BY id_fournisseur DESC");

        res.json({
            requestedBy: req.user?.email,
            roles: req.user?.roles,
            fournisseurs: result.rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Erreur fetching fournisseurs",
            error: error.message
        });

    }
};


/**
 * GET FOURNISSEUR BY ID
 */
exports.getById = async (req, res) => {

    const { id } = req.params;

    try {

        const result = await db.query(
            "SELECT * FROM fournisseurs WHERE id_fournisseur=$1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Fournisseur not found" });
        }

        res.json(result.rows[0]);

    } catch (error) {

        res.status(500).json({
            message: "Erreur fetching fournisseur",
            error: error.message
        });

    }
};


/**
 * CREATE FOURNISSEUR
 */
exports.create = async (req, res) => {

    try {

        const { nom, email, telephone, adresse } = req.body;

        const result = await db.query(
            `INSERT INTO fournisseurs (nom,email,telephone,adresse)
             VALUES ($1,$2,$3,$4)
             RETURNING *`,
            [nom, email, telephone, adresse]
        );

        res.status(201).json({
            message: "Fournisseur created",
            createdBy: req.user?.email,
            fournisseur: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Erreur création fournisseur",
            error: error.message
        });

    }
};


/**
 * UPDATE FOURNISSEUR
 */
exports.update = async (req, res) => {

    const { id } = req.params;

    try {

        const result = await db.query(
            "SELECT * FROM fournisseurs WHERE id_fournisseur=$1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Fournisseur not found" });
        }

        const fournisseur = result.rows[0];

        const updatedData = {
            nom: req.body.nom ?? fournisseur.nom,
            email: req.body.email ?? fournisseur.email,
            telephone: req.body.telephone ?? fournisseur.telephone,
            adresse: req.body.adresse ?? fournisseur.adresse,
            status: req.body.status ?? fournisseur.status
        };

        const updateResult = await db.query(
            `UPDATE fournisseurs
             SET nom=$1, email=$2, telephone=$3, adresse=$4, status=$5
             WHERE id_fournisseur=$6
             RETURNING *`,
            [
                updatedData.nom,
                updatedData.email,
                updatedData.telephone,
                updatedData.adresse,
                updatedData.status,
                id
            ]
        );

        res.json({
            message: "Fournisseur updated",
            updatedBy: req.user?.email,
            fournisseur: updateResult.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Erreur mise à jour fournisseur",
            error: error.message
        });

    }
};


/**
 * DELETE FOURNISSEUR
 */
exports.delete = async (req, res) => {

    const { id } = req.params;

    try {

        await db.query(
            "DELETE FROM fournisseurs WHERE id_fournisseur=$1",
            [id]
        );

        res.json({
            message: "Fournisseur deleted",
            deletedBy: req.user?.email
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Erreur suppression fournisseur",
            error: error.message
        });

    }
};

exports.activer = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(
            "UPDATE fournisseurs SET status='ACTIVE' WHERE id_fournisseur=$1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Fournisseur not found" });
        }
        res.json({
            message: "Fournisseur activated",
            fournisseur: result.rows[0],
            updatedBy: req.user?.email
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur activation fournisseur",
            error: error.message
        });
    }
};

exports.desactiver = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(
            "UPDATE fournisseurs SET status='INACTIVE' WHERE id_fournisseur=$1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Fournisseur not found" });
        }
        res.json({
            message: "Fournisseur deactivated",
            fournisseur: result.rows[0],
            updatedBy: req.user?.email
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur désactivation fournisseur",
            error: error.message
        });
    }
};