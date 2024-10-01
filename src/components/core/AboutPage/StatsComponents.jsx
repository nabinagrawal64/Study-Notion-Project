import React from 'react'

const Stats = [
    {count: "5k", lebel: "Active Students"},
    {count: "10+", lebel: "Mentors"},
    {count: "200+", lebel: "Courses"},
    {count: "50+", lebel: "Awards"},

]

const StatsComponents = () => {
  return (
    <section className=' lg:py-20 max-w-maxContent items-center justify-center'>
        <div className=' flex lg:gap-64'>
            {
                Stats.map((data, index) => {
                    return (
                        <div key={index} >
                            <h1 className='text-[26px] font-bold py-2' >{data.count}</h1>
                            <h2 className='text-richblack-400' >{data.lebel}</h2>
                        </div>

                    )
                })
            }
        </div>
    </section>
  )
}

export default StatsComponents