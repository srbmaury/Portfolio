import React, { useRef } from 'react'
import './Skills.css'
import useIsInViewport from '../../useIsInViewport';

export default function Skills(){

    const ref = useRef(null);
    const isInViewport = useIsInViewport(ref);

    const bars = [
        'bar-c', 'bar-cpp', 'bar-python', 'bar-js', 'bar-html', 'bar-c', 'bar-react', 'bar-django'
    ]
    const elements = document.getElementsByClassName('bar');
    if(isInViewport){
        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            element.classList.add(bars[index]);
        }
    }else{
        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            element.classList.remove(bars[index]);
        }
    }

    return (
        <div ref={ref} className="skills" id="Skills">
            <h3 className="heading">Skills</h3>
            <div className="groups">
                <p>C</p>
                <div className="progress-bar">
                    <div className="bar"></div>
                </div>
                <p>C++</p>
                <div className="progress-bar">
                    <div className="bar"></div>
                </div>
                <p>Python</p>
                <div className="progress-bar">
                    <div className="bar"></div>
                </div>
                <p>Javascript</p>
                <div className="progress-bar">
                    <div className="bar"></div>
                </div>
            </div>
            <div className="groups">
                <p>HTML</p>
                <div className="progress-bar">
                    <div className="bar"></div>
                </div>
                <p>CSS</p>
                <div className="progress-bar">
                    <div className="bar"></div>
                </div>
                <p>ReactJS</p>
                <div className="progress-bar">
                    <div className="bar"></div>
                </div>
                <p>Django</p>
                <div className="progress-bar">
                    <div className="bar"></div>
                </div>
            </div>
        </div>
    )
}