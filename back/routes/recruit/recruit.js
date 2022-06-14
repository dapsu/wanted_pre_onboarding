const models = require('../../models');

// 채용공고 목록 가져오기
const show = (req, res) => {
    models.Recruit
        .findAll({
            attributes: ['id', 'companyName', 'country', 'location', 'recruitPosition', 'signingBonus', 'skillStack']
        })
        .then(recruits => {
            res.json(recruits);
        });
};

// 채용 상세 페이지 가져오기
const detail = (req, res) => {
    const id = parseInt(req.params.id, 10);

    models.Recruit
        .findOne({
            where: { id },
            attributes: ['id', 'companyName', 'country', 'location', 'recruitPosition', 'signingBonus', 'skillStack', 'recruitDescribe']
        })
        .then(recruit => {
            if (!recruit) return res.status(404).end();     // 객체를 찾을 수 없는 경우 404 상태 코드 반환
            res.json(recruit);
        });
};

// 채용공고 등록하기
const register = (req, res) => {
    const body = req.body;
    const companyName = body.companyName;
    if (!companyName) {
        return res.status(400).end();   // 회사명 파라미터 누락시 400 상태 코드 반환
    }

    models.Recruit.create(body)
        .then(recruit => {
            res.status(201).json(recruit);
        })
        .catch(err => {
            res.status(500).end();
        });
};

// 채용공고 수정하기
const update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    //body 내 속성들 상수 설정
    const body = req.body;
    const companyName = body.companyName;
    const recruitPosition = body.recruitPosition;
    const signingBonus = body.signingBonus;
    const recruitDescribe = body.recruitDescribe;
    const skillStack = body.skillStack;
    const country = body.country;
    const location = body.location;

    models.Recruit.findOne({ where: { id } })
        .then(recruit => {
            if (!recruit) {
                return res.status(404).end();
            }
            // 각 속성이 존재한다면 수정
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

// 채용공고 삭제하기
const destroy = (req, res) => {
    const id = parseInt(req.params.id, 10);

    models.Recruit.destroy({ where: { id } })
        .then(() => {
            res.status(204).end();
        });
}

module.exports = { show, detail, register, update, destroy };