import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

export default function FacialExpression() {
    const videoRef = useRef();
    const [message, setMessage] = useState('');  // <-- To store and display expression

    const loadModels = async () => {
        const MODEL_URL = '/models';
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
            })
            .catch((err) => console.error("Error accessing webcam: ", err));
    };

    async function detectMood() {
        const detections = await faceapi
            .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();

        let mostProbableExpression = 0;
        let _expression = '';

        if (!detections || detections.length === 0) {
            console.log("No face detected");
            setMessage("No face detected");  // Also show on screen
            return;
        }

        for (const expression of Object.keys(detections[0].expressions)) {
            if (detections[0].expressions[expression] > mostProbableExpression) {
                mostProbableExpression = detections[0].expressions[expression];
                _expression = expression;
            }
        }

        console.log(_expression);
        setMessage(_expression);  // Update UI
    }

    useEffect(() => {
        loadModels().then(startVideo);
    }, []);

    return (
        <div style={{ position: 'relative', textAlign: 'center' }}>
            <video
                ref={videoRef}
                autoPlay
                muted
                style={{ width: '720px', height: '560px', border: '1px solid #ccc' }}
            />
            <br />
            <button onClick={detectMood} style={{ marginTop: '10px' }}>Detect Mood</button>
            <h2 style={{ marginTop: '20px' }}>Detected Expression: {message}</h2>
        </div>
    );
}
