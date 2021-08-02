import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import ReactDOM from 'react-dom';
import StreamVid from './StreamVid'
import Image from './Image'

// Component for displaying the content within a post
// Properties:
// content: content to be displayed (post)
// back: function to be called when the back button is selected
// select: whether any post is currently selected (boolean)
const DisplayPost = ({ content, back, select }) => {
    // the DOM/React elements of the content
    const [elements, setElements] = useState([])
    // whether the content is loaded (not really used atm)
    const [isLoaded, setIsLoaded] = useState(false)
    // previous content data (not really used atm)
    const [prevData, setPrevData] = useState({})
    // function to load the selected content properly
    // idk if this is the best way to do this :/
    const loadPost = (reset) => {
        if(reset){
            // console.log("parsing dynamic content");
            var newElements = []
            var mainDiv = document.getElementsByClassName("post-content")[0];
            //var test = document.createElement("p");
            //test.innerText = "test";   
            var lines = content.data.split("|")
            for(var i = 0; i < lines.length; i++){
                if(lines[i].charAt(1)==="p"){
                    var pElement = document.createElement("p");
                    pElement.innerText = lines[i].substr(3,lines[i].length-6);
                    newElements.push(pElement)
                }
                else if(lines[i].charAt(1)==="h"){
                    var pElement = document.createElement("h2");
                    pElement.innerText = lines[i].substr(3,lines[i].length-6);
                    newElements.push(pElement)
                }
                else if(lines[i].charAt(1)==="v"){
                    const vidElement= <StreamVid url={lines[i].substr(3,lines[i].length-6)} />;
                    newElements.push(vidElement)
                }
                else if(lines[i].charAt(1)==="i"){
                    const imgElement= <Image source={'https://10.0.0.5:8001/media/images/' + lines[i].substr(3,lines[i].length-6)} />;
                    newElements.push(imgElement)
                }
            }

            // look into react dom rendering and react elements
            //const body = React.createElement('p', {}, 'Lorem ipsum dolor sit amet');
            //mainDiv.appendChild(test);
            //newElements.push(test)
            setElements(newElements)
            setIsLoaded(true)
            setPrevData(content)

        }
        else{
            var mainDiv = document.getElementsByClassName("post-content")[0];
            var rContentCount = 0
            for(var i = 0; i < elements.length; i++){
                if(elements[i] instanceof HTMLElement){
                    mainDiv.appendChild(elements[i])
                }
                else{
                    var divElement = document.createElement("div");
                    divElement.className = "react-content"
                    mainDiv.appendChild(divElement)
                    ReactDOM.render(
                        elements[i],
                        document.getElementsByClassName("react-content")[rContentCount]
                      );
                      rContentCount++;
                }
            }
        }
    }


    useEffect(() => {
        if(select === true){
            if(prevData.data != content.data){
                loadPost(true)
            }
            else{
                loadPost(false)
            }
        }
      });

    return (
        <div>
            {select && <div className="post-content">
                <Button color='green' text={"back"} onClick={() => back(false)}/>
            </div>}
        </div>
    )
}


export default DisplayPost
