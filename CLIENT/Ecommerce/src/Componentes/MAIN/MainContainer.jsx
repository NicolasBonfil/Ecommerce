import { HeaderContainer } from '../HEADER/HeaderContainer.jsx'
import { FooterContainer } from '../FOOTER/FooterContainer.jsx';
import { CarouselContainer } from '../PRODUCTS/Carousel/CarouselContainer.jsx';

export const MainContainer = () => {
    return (
        <>
            <HeaderContainer/>
            <div id="main-container" className='pt-5 container-fluid'>
                <CarouselContainer/>
            </div>
            <FooterContainer/>
        </>
    )
}


