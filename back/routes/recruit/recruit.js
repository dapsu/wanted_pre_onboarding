const sequelize = require('sequelize');
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
const detail = async (req, res) => {
    const id = parseInt(req.params.id, 10);     // id 파라미터 값
    const detailResult = await models.Recruit.findOne({     // 찾을 상세페이지 데이터
        where: { id },
        attributes: ['id', 'companyName', 'country', 'location', 'recruitPosition', 'signingBonus', 'skillStack', 'recruitDescribe']
    });

    // id로 객체를 찾을 수 없는 경우 404 상태 코드를 반환
    if (detailResult === null) return res.status(404).end();

    const result = detailResult.dataValues;     // 응답할 상세 페이지 객체
    const companyName = detailResult.dataValues.companyName;

    const otherRecruits = await models.Recruit.findAll({    // 같은 회사에서 올린 다른 채용공고 데이터
        where: { companyName },
        attributes: ['id']
    });

    const otherId = [];     // 다른 채용공고 id값 담을 배열
    if (otherRecruits.length > 0) {
        otherRecruits.forEach(recruit => {
            if (id !== recruit.dataValues.id) otherId.push(recruit.dataValues.id);
        });
    }
    result['otherRecruits'] = otherId;      // 상세 페이지 객체에 다른 채용공고 속성 추가

    try {
        res.json(result);
    }
    catch (err) {
        console.error(err);
    }
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

// 채용공고 검색 기능
const search = async (req, res) => {
    const keyword = req.query.keyword;      // 검색하고자 하는 키워드
    const result = [];      // 검색요건 만족하는 객체 담는 배열
    const isValid = (res) => {      // 추가하려는 객체가 result에 있는 객체와 중복되는지 체크
        for (const data of result) {
            if (data.id === res.dataValues.id) return false;
        }
        return true;
    };

    // companyName 검색 결과
    const searchCompanyName = await models.Recruit.findAll({
        where: {
            companyName: {
                [sequelize.Op.like]: `%${keyword}%`
            }
        },
        attributes: ['id', 'companyName', 'country', 'location', 'recruitPosition', 'signingBonus', 'skillStack']
    });
    // companyName 데이터 result값에 저장
    if (searchCompanyName.length > 0) {
        searchCompanyName.forEach(res => {
            result.push(res.dataValues);
        });
    }
    // country 검색 결과
    const searchCountry = await models.Recruit.findAll({
        where: {
            country: {
                [sequelize.Op.like]: `%${keyword}%`
            }
        },
        attributes: ['id', 'companyName', 'country', 'location', 'recruitPosition', 'signingBonus', 'skillStack']
    });
    // country 데이터 result값에 저장
    if (searchCountry.length > 0) {
        searchCountry.forEach(res => {
            if (isValid(res)) result.push(res.dataValues);
        });
    }

    // location 검색 결과
    const searchLocation = await models.Recruit.findAll({
        where: {
            location: {
                [sequelize.Op.like]: `%${keyword}%`
            }
        },
        attributes: ['id', 'companyName', 'country', 'location', 'recruitPosition', 'signingBonus', 'skillStack']
    });
    // location 데이터 result값에 저장
    if (searchLocation.length > 0) {
        searchLocation.forEach(res => {
            if (isValid(res)) result.push(res.dataValues);
        });
    }

    // recruitPosition 검색 결과
    const searchrecruitPosition = await models.Recruit.findAll({
        where: {
            recruitPosition: {
                [sequelize.Op.like]: `%${keyword}%`
            }
        },
        attributes: ['id', 'companyName', 'country', 'location', 'recruitPosition', 'signingBonus', 'skillStack']
    });
    // recruitPosition 데이터 result값에 저장
    if (searchrecruitPosition.length > 0) {
        searchrecruitPosition.forEach(res => {
            if (isValid(res)) result.push(res.dataValues);
        });
    }

    // signingBonus 검색 결과
    const searchsigningBonus = await models.Recruit.findAll({
        where: {
            signingBonus: {
                [sequelize.Op.like]: `%${keyword}%`
            }
        },
        attributes: ['id', 'companyName', 'country', 'location', 'recruitPosition', 'signingBonus', 'skillStack']
    });
    // signingBonus 데이터 result값에 저장
    if (searchsigningBonus.length > 0) {
        searchsigningBonus.forEach(res => {
            if (isValid(res)) result.push(res.dataValues);
        });
    }

    // skillStack 검색 결과
    const searchskillStack = await models.Recruit.findAll({
        where: {
            skillStack: {
                [sequelize.Op.like]: `%${keyword}%`
            }
        },
        attributes: ['id', 'companyName', 'country', 'location', 'recruitPosition', 'signingBonus', 'skillStack']
    });
    // skillStack 데이터 result값에 저장
    if (searchskillStack.length > 0) {
        searchskillStack.forEach(res => {
            if (isValid(res)) result.push(res.dataValues);
        });
    }

    if (result.length > 0) {
        try {
            res.json(result);
        }
        catch (err) {
            console.error(err);
        }
    }
    else {
        res.status(404).end();
    }
};

module.exports = { show, detail, register, update, destroy, search };