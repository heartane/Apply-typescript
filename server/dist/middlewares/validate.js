import { validationResult } from 'express-validator';
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    console.log('errors', errors);
    if (!errors.isEmpty()) {
        res.status(400).json({ message: errors.array() });
        return;
    }
    next();
};
/*
전 프로젝트까지는 DB에 데이터를 저장하기 전에 스키마로 유효성 검사한 것이 전부였다.

이제는 시각을 넓혀 좋은 서버를 위해, 생산성과 효율성을 고려하게 되면서
서버 측의 유효성 검사가 필요하다는 것을 알게되었다.

가능한 빨리 요청 데이터의 유효성을 검사하여 pure한 데이터만 걸러내
비즈니스 로직에 불필요한 일을 줄여주도록 라우터에서 validation을 진행하도록 했다!
*/
//# sourceMappingURL=validate.js.map