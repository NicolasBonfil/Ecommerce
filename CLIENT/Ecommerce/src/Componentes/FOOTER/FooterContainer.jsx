import React from 'react'

export const FooterContainer = () => {
    return (
        <div id='footer-container' className='container-fluid'>
            <div id="footer-list">
                <ul>
                    <li>PRODUCTOS</li>
                    <li>PRIVACIDAD</li>
                    <li>TERMINOS</li>
                    <li>FAQS</li>
                </ul>
            </div>
            <div id="social-media">
                <ul>
                    <div className='footer-contact'>
                        <img src="/gmail-logo.png" alt="" className='img-fluid'/>
                        <li>...@gmail.com</li>
                    </div>
                    <div className='footer-contact'>
                        <img src="/whatsapp-logo.png" alt="" className='img-fluid'/>
                        <li>11 2463-0729</li>
                    </div>
                    <div className='footer-contact'>
                        <img src="/instagram-logo.svg" alt="" className='img-fluid'/>
                        <li>instagram</li>
                    </div>
                </ul>
            </div>

        </div>
    )
}
