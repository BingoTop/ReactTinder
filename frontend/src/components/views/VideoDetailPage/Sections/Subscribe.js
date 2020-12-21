import axios from 'axios';
import React, {
    useEffect,
    useState,
} from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

function Subscribe(props) {
    const user = useSelector(
        (state) => state.user
    );
    const [
        SubscribeNumber,
        setSubscribeNumber,
    ] = useState(0);
    const [Subscribed, setSubscribed] = useState(
        false
    );
    useEffect(() => {
        let variable = { userTo: props.userTo };
        axios
            .post(
                '/api/subscribe/subscribeNumber',
                variable
            )
            .then((res) => {
                if (res.data.success) {
                    setSubscribeNumber(
                        res.data.subscribeNumber
                    );
                } else {
                    alert(
                        '구독자 수 정보 가져오기 실패'
                    );
                }
            });
        let subscribedVariable = {
            userTo: props.userTo,
            userFrom: localStorage.getItem(
                'user_Id'
            ),
        };
        axios
            .post(
                '/api/subscribe/subscribed',
                subscribedVariable
            )
            .then((res) => {
                if (res.data.success) {
                    setSubscribed(
                        res.data.subscribed
                    );
                } else {
                    alert('정보를 불러오기 실패');
                }
            });
    }, []);
    const onSubscribe = () => {
        let subscribedVariable = {
            userTo: props.userTo,
            userFrom: user.userData._id,
        };
        if (
            user.userData &&
            !user.userData.isAuth
        ) {
            props.history.push('/login');
            return;
        }

        if (Subscribed) {
            axios
                .post(
                    '/api/subscribe/unSubscribe',
                    subscribedVariable
                )
                .then((res) => {
                    if (res.data.success) {
                        setSubscribeNumber(
                            SubscribeNumber - 1
                        );
                        setSubscribed(
                            !Subscribed
                        );
                    } else {
                        alert('구독 취소 실패');
                    }
                });
        } else {
            axios
                .post(
                    '/api/subscribe/subscribe',
                    subscribedVariable
                )
                .then((res) => {
                    if (res.data.success) {
                        setSubscribeNumber(
                            SubscribeNumber + 1
                        );
                        setSubscribed(
                            !Subscribed
                        );
                    } else {
                        alert('구독 실패');
                    }
                });
        }
    };
    return (
        <div>
            <button
                style={{
                    backgroundColor: `${
                        Subscribed
                            ? '#AAAAAA'
                            : '#CC0000'
                    }`,
                    borderRadius: '4px',
                    color: 'white',
                    padding: '10px 16px',
                    fontWeight: '500',
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    border: 'none',
                }}
                onClick={onSubscribe}
            >
                {SubscribeNumber}{' '}
                {Subscribed
                    ? 'Subscribed'
                    : 'Subscribe'}
            </button>
        </div>
    );
}

export default withRouter(Subscribe);
