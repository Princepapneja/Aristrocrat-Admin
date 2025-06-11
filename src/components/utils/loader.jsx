

const Loader = () => {
    return (
        <>
            <div className="fixed w-full backdrop-blur-sm flex justify-center items-center h-screen  ">
                <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primary" />
                <img
                    src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
                    className="rounded-full h-28 w-28"
                />
            </div>

        </>
    )
}

export default Loader