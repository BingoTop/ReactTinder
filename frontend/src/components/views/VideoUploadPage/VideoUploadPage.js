import React, { useState } from 'react';
import {
    Typography,
    Button,
    Form,
    message,
    Input,
    Icon,
} from 'antd';
import { withRouter } from 'react-router-dom';
import DropZone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
    {
        value: 0,
        label: 'Private',
    },
    { value: 1, label: 'Public' },
];
const CategoryOptions = [
    { value: 0, label: 'Film & Animation' },
    { value: 1, label: 'Autos & Vehicles' },
    { value: 2, label: 'Music' },
    { value: 3, label: 'Pets & Animals' },
];

function VideoUploadPage() {
    const user = useSelector(
        (state) => state.user
    );
    const [VideoTitle, setVideoTitle] = useState(
        ''
    );
    const [
        Description,
        setDescription,
    ] = useState('');
    const [Private, setPrivate] = useState(0);
    const [Category, setCategory] = useState(
        'Film & Animation'
    );
    const [FilePath, setFilePath] = useState('');
    const [Duration, setDuration] = useState('');
    const [
        ThumbnailPath,
        setThumbnailPath,
    ] = useState('');

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value);
    };
    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value);
    };
    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value);
    };
    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(FilePath, ThumbnailPath);
        const variables = {
            writter: user.userData._id,
            title: VideoTitle,
            description: Description,
            privacy: Private,
            filePath: FilePath,
            category: Category,
            duration: Duration,
            thumbnail: ThumbnailPath,
        };
        console.log(variables);
        axios
            .post(
                '/api/video/uploadVideo',
                variables
            )
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data);
                } else {
                    alert('비디오 업로드 실패');
                }
            });
    };
    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: {
                'content-type':
                    'multipart/form-data',
            },
        };
        formData.append('file', files[0]);
        axios
            .post(
                '/api/video/uploadfiles',
                formData,
                config
            )
            .then((res) => {
                if (res.data.success) {
                    let variable = {
                        url: res.data.filePath,
                        fileName:
                            res.data.fileName,
                    };
                    setFilePath(
                        res.data.filePath
                    );
                    axios
                        .post(
                            '/api/video/thumbnail',
                            variable
                        )
                        .then((res) => {
                            if (
                                res.data.success
                            ) {
                                setDuration(
                                    res.data
                                        .fileDuration
                                );
                                setThumbnailPath(
                                    res.data
                                        .thumbsFilePath
                                );
                            } else {
                                alert(
                                    '썸네일 생성 실패'
                                );
                            }
                        });
                } else {
                    alert('비디오 업로드 실패');
                }
            });
    };
    return (
        <div
            style={{
                maxWidth: '700px',
                margin: '2rem auto',
            }}
        >
            <div
                style={{
                    textAlign: 'center',
                    marginBottom: '2rem',
                }}
            >
                <Title level={2}>
                    Upload Videos
                </Title>
            </div>
            <Form onSubmit={onSubmit}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent:
                            'space-between',
                    }}
                >
                    {/* Drop Zone */}
                    <DropZone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={100000000}
                    >
                        {({
                            getRootProps,
                            getInputProps,
                        }) => (
                            <div
                                style={{
                                    width:
                                        '300px',
                                    height:
                                        '240px',
                                    border:
                                        '1px solid lightgray',
                                    display:
                                        'flex',
                                    alignItems:
                                        'center',
                                    justifyContent:
                                        'center',
                                }}
                                {...getRootProps()}
                            >
                                <input
                                    {...getInputProps()}
                                />
                                <PlusOutlined
                                    type="plus"
                                    style={{
                                        fontSize:
                                            '3rem',
                                    }}
                                />
                            </div>
                        )}
                    </DropZone>

                    {/* Thumbnail */}
                    {ThumbnailPath && (
                        <div>
                            <img
                                src={`http://localhost:5000/${ThumbnailPath}`}
                                alt="thumbnail"
                            />
                        </div>
                    )}
                </div>
                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={VideoTitle}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                />
                <br />
                <br />
                <select
                    onChange={onPrivateChange}
                >
                    {PrivateOptions.map(
                        (item, index) => (
                            <option
                                key={index}
                                value={item.value}
                            >
                                {item.label}
                            </option>
                        )
                    )}
                </select>
                <br />
                <br />
                <select
                    onChange={onCategoryChange}
                >
                    {CategoryOptions.map(
                        (item, index) => (
                            <option
                                key={index}
                                value={item.value}
                            >
                                {item.label}
                            </option>
                        )
                    )}
                </select>
                <br />
                <br />
                <Button
                    type="primary"
                    size="large"
                    onClick={onSubmit}
                >
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default VideoUploadPage;
