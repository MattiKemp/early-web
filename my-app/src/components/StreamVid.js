import { FaTimes, FaTrashAlt } from 'react-icons/fa'
import Hls from 'hls.js';

import ReactHlsPlayer from 'react-hls-player';

const StreamVid = ({ url, onStream }) => {
    const embedVideo = (url) => {
        var video = document.getElementsByClassName('vid');
        var hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
      }
    embedVideo(url);
    var config = {testBandwidth: false,
        lowLatencyMode:false}
      
    return (
        <div >
            {/* <video className={'vid'}></video> */}
            <ReactHlsPlayer src={url} autoPlay={false} controls={true} width="100%" height="auto" ></ReactHlsPlayer>
        </div>
    )
}

export default StreamVid
