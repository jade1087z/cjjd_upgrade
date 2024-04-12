import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

const TopBtn: React.ForwardRefRenderFunction<HTMLDivElement> = (props, ref) => {
  return (
    <div ref={ref} className='toTheTop'>
      <div>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <FontAwesomeIcon icon={faAngleUp} />
        </button>
      </div>
    </div>
  )
};

export default React.forwardRef(TopBtn);