import Header from '../components/header/Header'

const Default = ({ children }) => {
    return (
        <>
            <Header />
            { children }
            <h1>aqui ficara o footer</h1>
        </>
    )
}

export default Default