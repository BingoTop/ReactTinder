import React, { useEffect } from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (
    SpecificComponent,
    option,
    adminRoute = null
) {
    // null => 아무나 출입이 가능
    // true => 로그인한 유저만 출입 가능
    // false => 로그인한 유저는 출입 불가능한 페이지

    function AuthenticationCheck(props) {
        let user = useSelector(
            (state) => state.user
        );
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth()).then(async (res) => {
                // console.log(res);
                // 로그인 하지 않은 상태
                if (await !res.payload.isAuth) {
                    if (option) {
                        props.history.push(
                            '/login'
                        );
                    }
                } else {
                    // 로그인한 상태
                    if (
                        adminRoute &&
                        !res.payload.isAdmin
                    ) {
                        props.history.push('/');
                    } else {
                        if (option === false) {
                            props.history.push(
                                '/'
                            );
                        }
                    }
                }
            });
        }, []);
        return (
            <SpecificComponent
                {...props}
                user={user}
            />
        );
    }
    return AuthenticationCheck;
}
