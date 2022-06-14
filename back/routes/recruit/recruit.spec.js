const request = require('supertest');
const should = require('should');
const app = require('../../index');
const models = require('../../models');

// 채용공고 목록 가져오기 테스트 코드
describe('GET /recruits ', () => {
    const company = [{
        'companyName': '라인',
        'recruitPosition': '경력 백엔드',
        'country': '한국',
        'location': '판교',
        'signingBonus': 500000,
        'recruitDescribe': '라인은 ....',
        'skillStack': 'JAVA',
    },
    {
        'companyName': '당근마켓',
        'recruitPosition': '인턴 백엔드',
        'country': '한국',
        'location': '서울',
        'signingBonus': 5000000,
        'recruitDescribe': '당근마켓 검색팀에서 인턴을 모집합니다 ...',
        'skillStack': 'Node.js',
    }
    ];
    before(() => models.sequelize.sync({ force: true }));  // 테스트 시 force 옵션을 true로 해서 테스트할 때마다 DB를 초기화한다.
    before(() => models.Recruit.bulkCreate(company));

    describe('성공 시', () => {
        it('채용 공고 객체를 담은 배열로 응답한다', (done) => {
            request(app)
                .get('/recruits')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    done();
                });
        });
    });
});

// 채용 상세 페이지 가져오기 테스트 코드
describe('GET /recruits/:id', () => {
    const company = {
        'companyName': '라인',
        'recruitPosition': '경력 백엔드',
        'country': '한국',
        'location': '판교',
        'signingBonus': 500000,
        'recruitDescribe': '라인은 ....',
        'skillStack': 'JAVA',
    };
    before(() => models.sequelize.sync({ force: true }));
    before(() => models.Recruit.create(company));

    describe('성공 시', () => {
        it('id가 1인 채용 상세페이지를 반환한다', (done) => {
            request(app)
                .get('/recruits/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1);
                    done();
                });
        });
    });

    describe('실패 시', () => {
        it('id로 객체를 찾을 수 없는 경우 404를 응답한다', (done) => {
            request(app)
                .get('/recruits/99999')
                .expect(404)
                .end(done);
        });
    });
});

// 채용공고 등록하기 테스트 코드
describe('POST /register', () => {
    const company = {
        'companyName': '당근마켓',
        'recruitPosition': '인턴 백엔드',
        'country': '한국',
        'location': '서울',
        'signingBonus': 5000000,
        'recruitDescribe': '당근마켓 검색팀에서 인턴을 모집합니다 ...',
        'skillStack': 'Node.js'
    };
    before(() => models.sequelize.sync({ force: true }));

    describe('성공 시', (done) => {
        let body;
        before(done => {
            request(app)
                .post('/register')
                .send(company)
                .expect(201)
                .end((err, res) => {
                    body = res.body;
                    done();
                });
        });

        it('생성된 객체의 id를 반환한다', () => {
            body.should.have.property('id');
        });

        it('입력한 companyName을 반환한다', () => {
            body.should.have.property('companyName', '당근마켓');
        });
    });

    describe('실패 시', () => {
        it('companyName 파라미터 누락 시 400을 반환한다', (done) => {
            request(app)
                .post('/register')
                .send({})
                .expect(400)
                .end(done);
        });
    });
});

// 채용공고 수정하기 테스트 코드
describe('PUT /recruits/:id', () => {
    const company = {
        'companyName': '당근마켓',
        'recruitPosition': '인턴 백엔드',
        'country': '한국',
        'location': '서울',
        'signingBonus': 5000000,
        'recruitDescribe': '당근마켓 검색팀에서 인턴을 모집합니다 ...',
        'skillStack': 'Node.js'
    };
    before(() => models.sequelize.sync({ force: true }));
    before(() => models.Recruit.create(company));

    describe('성공 시', () => {
        it('변경된 companyName을 응답한다', (done) => {
            const companyName = 'kakao';
            request(app)
                .put('/recruits/1')
                .send({ companyName })
                .end((err, res) => {
                    res.body.should.have.property('companyName', companyName);
                    done();
                });
        });

        it('변경된 recruitPosition을 응답한다', (done) => {
            const recruitPosition = '경력 프론트엔드';
            request(app)
                .put('/recruits/1')
                .send({ recruitPosition })
                .end((err, res) => {
                    res.body.should.have.property('recruitPosition', recruitPosition);
                    done();
                });
        });

        it('변경된 signingBonus을 응답한다', (done) => {
            const signingBonus = 100000;
            request(app)
                .put('/recruits/1')
                .send({ signingBonus })
                .end((err, res) => {
                    res.body.should.have.property('signingBonus', signingBonus);
                    done();
                });
        });

        it('변경된 recruitDescribe을 응답한다', (done) => {
            const recruitDescribe = 'kakao is ...';
            request(app)
                .put('/recruits/1')
                .send({ recruitDescribe })
                .end((err, res) => {
                    res.body.should.have.property('recruitDescribe', recruitDescribe);
                    done();
                });
        });

        it('변경된skillStack을 응답한다', (done) => {
            const skillStack = 'vue.js';
            request(app)
                .put('/recruits/1')
                .send({ skillStack })
                .end((err, res) => {
                    res.body.should.have.property('skillStack', skillStack);
                    done();
                });
        });

        it('국가와 지역에 대한 데이터를 삽입한다', (done) => {
            const country = '한국';
            const location = '판교'
            request(app)
                .put('/recruits/1')
                .send({ country, location })
                .end((err, res) => {
                    res.body.should.have.property('country', country);
                    res.body.should.have.property('location', location);
                    done();
                });
        });
    });
});

// 테스트코드 삭제하기 채용 공고
describe('DELETE /recruits/:id', () => {
    const company = {
        'companyName': '당근마켓',
        'recruitPosition': '인턴 백엔드',
        'country': '한국',
        'location': '서울',
        'signingBonus': 5000000,
        'recruitDescribe': '당근마켓 검색팀에서 인턴을 모집합니다 ...',
        'skillStack': 'Node.js'
    };
    before(() => models.sequelize.sync({ force: true }));
    before(() => models.Recruit.create(company));

    describe('성공 시', () => {
        it('204를 응답한다', (done) => {
            request(app)
                .delete('/recruits/1')
                .expect(204)
                .end(done);
        });
    });
});