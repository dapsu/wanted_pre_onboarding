const app = require('../index');
const { sequelize } =  require('../models');

sequelize.sync({ force: false })
    .then(() => {
        console.log('DB 연결 성공!')
        app.listen(3000, function() {
            console.log('Example app listening on port 3000!');
        });
    })
    .catch((err) => {
        console.error(err);
    });
