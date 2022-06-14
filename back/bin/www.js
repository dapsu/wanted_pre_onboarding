const app = require('../index');
const { sequelize } =  require('../models');

// 시퀄라이즈 연동 후 서버 실행
sequelize.sync({ force: false })    // force 옵션 false 설정 통해 데이터 초기화되지 않도록 함
    .then(() => {
        console.log('DB 연결 성공!')
        app.listen(3000, function() {
            console.log('Example app listening on port 3000!');
        });
    })
    .catch((err) => {
        console.error(err);
    });
