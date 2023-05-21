
import { BiLogIn } from 'react-icons/bi'
export default function Login() {
    return (
        <button className='bg-[#0F570A] border-2 p-4 ml-96 mt-3 hover:bg-[#1DAC13] trnasform duration-300 hover:text-[#F9F9F9] rounded-full w-40'>
            <div className='flex content-center justify-center space-x-3'>
                <div>
                    <p className='text-[#F4E8C1] text-xl'>Login</p>
                </div>
                <div className='pt-2'>
                    <BiLogIn />
                </div>

            </div>

        </button>
    )
}
