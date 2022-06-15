const models = require('../../models');

// 채용공고 지원
const apply = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        // id 통해 채용 공고 조회
        const recruit = await models.Recruit.findOne({ where : { id: id } });
        if (!recruit) {
            return res.status(404).end();
        }

        // 지원자 조회. 이때 req.body에 id 속성 있다고 임의로 설정
        const user = await models.User.findOne({ where: { id: req.body.id } });
        if (!user) {
            return res.status(404).end();
        }

        // 지원자가 채용 공고에 지원하지 않았다면
        if (await user.getRecruit() === null) {
            await recruit.addUser(user.dataValues.id);
            res.send('지원 완료');
        }
        else {
            res.status(409).send('이미 지원하였습니다');
        }

    }
    catch (err) {
        console.error(err);
    } 
};

module.exports = { apply };