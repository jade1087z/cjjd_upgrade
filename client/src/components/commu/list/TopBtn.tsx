import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
interface TopBtnProps {
    pageEnd?: React.RefObject<HTMLDivElement>;
  }
const TopBtn:React.FC<TopBtnProps> = ({pageEnd}) => {
  return (
    <div ref={pageEnd} className='toTheTop'>
    <div>
        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <FontAwesomeIcon icon={faAngleUp} />
        </button>
    </div>

</div>
  )
}

export default TopBtn