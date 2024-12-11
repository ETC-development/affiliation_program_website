
// eslint-disable-next-line react/prop-types
function ResourceCellButton({cell , selected, onClick}) {
    return (
        <>
            <div className={`cursor-pointer flex justify-center items-center border-2 border-fontGreen rounded-lg px-4 py-1 mx-1 my-1 lg:px-8 lg:py-1 lg:rounded-xl ${selected ? 'bg-gradient-green' : ''}`}
            onClick={() => onClick()}
            >
                <p className="text-white font-nasalization text-sm lg:text-lg">{cell.name}</p>
            </div>
        </>
    );
}
export default ResourceCellButton;