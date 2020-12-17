import React, {
    useEffect,
    useState,
} from 'react';
import axios from 'axios';

function SideVideo() {
    const [SideVideos, setSideVideos] = useState(
        []
    );

    useEffect(() => {
        axios
            .get('/api/video/getVideos')
            .then((res) => {
                if (res.data.success) {
                    setSideVideos(
                        res.data.videos
                    );
                } else {
                    alert('비디오 가져오기 실패');
                }
            });
    }, []);

    const renderSideVideo = SideVideos.map(
        (video, index) => {
            let minutes = Math.floor(
                video.duration / 60
            );
            let seconds = Math.floor(
                video.duration - minutes * 60
            );

            return (
                <div
                    key={index}
                    style={{
                        display: 'flex',
                        marginBottom: '1rem',
                        padding: '0 2rem',
                    }}
                >
                    <div
                        style={{
                            width: '40%',
                            marginRight: '1rem',
                            height: '100%',
                        }}
                    >
                        <a href="">
                            <img
                                style={{
                                    width: '100%',
                                }}
                                src={`http://localhost:5000/${video.thumbnail}`}
                                alt="thumbnail"
                            />
                        </a>
                    </div>
                    <div style={{ width: '40%' }}>
                        <a
                            href=""
                            style={{
                                color: 'gray',
                            }}
                        >
                            <div
                                style={{
                                    fontSize:
                                        '1rem',
                                    color:
                                        'black',
                                }}
                            >
                                {video.title}
                            </div>
                            <div>
                                {
                                    video.writter
                                        .name
                                }
                            </div>
                            <div>
                                {video.views}{' '}
                                views
                            </div>
                            <div>
                                {minutes} :{' '}
                                {seconds}
                            </div>
                        </a>
                    </div>
                </div>
            );
        }
    );
    return (
        <React.Fragment>
            <div
                style={{ marginTop: '3rem' }}
            ></div>
            {renderSideVideo}
        </React.Fragment>
    );
}

export default SideVideo;
