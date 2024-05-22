import { description } from "../application.json";
export function Hero() {
    return (
        <div
            className="h-[85vh]  flex flex-col items-start lg:px-20 px-4 justify-center"
        >
            <div className="flex flex-col lg:w-1/2 gap-4 lg:items-start">
                <h3 className="text-md font-semibold">- Hello and Welcone</h3>
                <h1 className="lg:text-6xl text-5xl flex flex-col font-bold gap-2 hero_text">
                    <span>Plan Your</span>
                    <span className="text-primary lg:text-7xl text-6xl">Dream Wedding</span>
                    <span>in Uttarakhand</span>
                </h1>
                <p >
                    {description}
                </p>
                {/* <button type="button">Book for consult</button> */}
                {/* <button className="bg-secondary text-white font-bold px-4 py-2 rounded-md" type="button">Book for consult </button> */}

            </div>
        </div>

    )
}
