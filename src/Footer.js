
import React from 'react'

const Footer = ({ start }) => {
    let styleLinks = !start ? 'links-continer' : 'links-continer-after-start';

    return (
        <div className={styleLinks}>
            <div>
                <p className="Links-p">
                    Find me at :
              </p>
            </div>
            <div className="links">
                <a className="link" href="https://github.com/aviadbourla">
                    <i class="fab fa-github"></i>
                </a>
                <a className="link" href="https://il.linkedin.com/in/aviad-bourla-56b4351aa">
                    <i class="fab fa-linkedin"></i>
                </a>
            </div>
        </div>
    )
}

export default Footer

