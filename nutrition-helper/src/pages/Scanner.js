import BasicNavBar from "../components/NavBar";
import "./Scanner.css";
import React, {useRef, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function Scanner() {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const navigate = useNavigate();

    const [hasPhoto, setHasPhoto] = useState(false);

    const getVideo = () => {
        navigator.mediaDevices
        .getUserMedia({ 
            video: {width: 1920, height: 1080 } 
        })
        .then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
        })
        .catch(err => {
            console.error(err);
        })
    }

    const takePhoto = () => {
        const width = 1920;
        const height = 1080;

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 1050, 0, width, height, 0, 0, width,
        height);
        setHasPhoto(true);

        // Downloads the taken image
        const image = new Image();

        image.src = photo.toDataURL();

        const link = document.createElement('a');

        link.href = image.src;
        link.download = 'photo_image.png';
        link.click();
        
        navigate("/analyze");
    }

    const closePhoto = () => {
        let photo = photoRef.current;
        let ctx = photo.getContext('2d');

        ctx.clearRect(0, 0, photo.width, photo.height);

        setHasPhoto(false);
    }

    useEffect(() => {
        getVideo();
    }, [videoRef])

    return (
        <>
            <BasicNavBar />
            <div class="Scanner">
                <div className="camera">
                    <video ref={videoRef}></video>
                    <button onClick={takePhoto}>SNAP!</button>
                </div>
                <div className={'result ' + (hasPhoto ? 'hasPhoto' : '')}>
                    <canvas ref={photoRef}></canvas>
                    <button onClick={closePhoto}>CLOSE!</button>
                </div>
            </div>
        </>
    )
}

export default Scanner;