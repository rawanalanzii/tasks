import LikeButton from "./like-button/like-button";
import SearchButton from "./search-button-second-challenge/search-button";
import SliderImages from "./slider-images-first-challenge/Banners-slider";


const Challenges = () => {
    return (
        <div className="App bg-slate-800 flex flex-col justify-center items-center">
            <h1 className='text-white text-6xl py-10 w-screen h-screen flex justify-center items-center'>Challenges</h1>
            <hr className="border-t-2 border-gray-600 w-full my-5" />
            <p className='text-white items-center py-5'>first challenge</p>
            <SliderImages />
            <hr className="border-t-2 border-gray-600 w-full my-5" />
            <p className='text-white items-center py-5'>second challenge</p>
            <SearchButton />
            <hr className="border-t-2 border-gray-600 w-full my-5" />
            <p className='text-white items-center py-5'></p>
            <LikeButton />
        </div>
    );
}

export default Challenges;
