export default function Die({value, toggleHeld, held}){
    return (
      <div
        className={
          held
            ? "bg-purple-600 rounded-lg h-[50px] w-[50px] flex items-center justify-center *:text-[1.5rem] cursor-pointer *:text-[#fff]"
            : "bg-white rounded-lg h-[50px] w-[50px] flex items-center justify-center *:text-[1.5rem] cursor-pointer *:text-[#2b2b2b]"
        }
        onClick={toggleHeld}
      >
        <h1>{value}</h1>
      </div>
    );
}