const models = require('../../models');

const show = (req, res) => {
    models.Recruit
        .findAll({
            attributes: ['id', 'companyName', 'country', 'location', 'recruitPosition', 'signingBonus', 'skillStack']
        })
        .then(recruits => {
            res.json(recruits);
        });
};

const search = (req, res) => {
    const id = parseInt(req.params.id, 10);

    models.Recruit
        .findOne({
            where: {id},
            attributes: ['id', 'companyName', 'country', 'location', 'recruitPosition', 'signingBonus', 'skillStack', 'recruitDescribe']
        })
        .then(recruit => {
            if (!recruit) return res.status(404).end();
            res.json(recruit);
        });
};

const register = (req, res) => {
    const body = req.body;
    const companyName = body.companyName;
    if (!companyName) {
        return res.status(400).end();
    }

    models.Recruit.create(body)
        .then(recruit => {
            res.status(201).json(recruit);
        })
        .catch(err => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).end();
            }
            res.status(500).end();
        });
};

const update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const body = req.body;
    const companyName = body.companyName;
    const recruitPosition = body.recruitPosition;
    const signingBonus = body.signingBonus;
    const recruitDescribe = body.recruitDescribe;
    const skillStack = body.skillStack;
    const country = body.country;
    const location = body.location;

    models.Recruit.findOne({where: {id}})
        .then(recruit => {
            if (!recruit) {
                return res.status(404).end();
            }
            if (companyName !== undefined) recruit.companyName = companyName;
            if (recruitPosition !== undefined) recruit.recruitPosition = recruitPosition;
            if (signingBonus !== undefined) recruit.signingBonus = signingBonus;
            if (recruitDescribe !== undefined) recruit.recruitDescribe = recruitDescribe;
            if (skillStack !== undefined) recruit.skillStack = skillStack;
            if (country !== undefined) recruit.country = country;
            if (location !== undefined) recruit.location = location;

            recruit.save()
                .then(_ => {
                    res.json(recruit);
                })
                .catch(err => {
                    if (err.name === 'SequelizeUniqueConstraintError') {
                        return res.status(409).end();
                    }
                    res.status(500).end();
                });
        });
}

const destroy = (req, res) => {
    const id = parseInt(req.params.id, 10);

    models.Recruit.destroy({where: {id}})
        .then(() => {
            res.status(204).end();
        });
}

module.exports = {show, search, register, update, destroy};