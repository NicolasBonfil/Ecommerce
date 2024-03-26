import Spinner from 'react-bootstrap/Spinner';

export const Loading = () => {
    return (
        <div className="cargando">
            <Spinner animation="border" role="status" className='spinner'>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}
