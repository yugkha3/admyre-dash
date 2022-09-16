import React, { useEffect } from 'react'
import { result2 as result } from './result'
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VerifiedIcon from '@mui/icons-material/Verified';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import { Icon } from '@iconify/react';
import {ReactComponent as FollowerGraphic} from '../../assets/images/follower.svg'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const Insights = () => {

    
    const floatStyles = "bg-white shadow-md dark:text-gray-200 dark:bg-secondary-dark-bg hover:shadow-lg rounded-xl"
    const checkType = (type) => {
        if(type === "youtube") {
            return <span className='text-red-500'><YouTubeIcon style={{fontSize: '38px'}}/></span>
        }
        else if(type === "instagram") {
            return <span className='text-pink-800'><InstagramIcon style={{fontSize: '38px'}}/></span>
        }
        else if(type === "twitter") {
            return <span className='text-blue-400'><TwitterIcon style={{fontSize: '38px'}}/></span>
        }
    }

    const contactType = (type) => {
        if(type === 'instagram'){
            return <span className='text-pink-800'><InstagramIcon /></span>
        } else if(type === 'twitter'){
            return <span className='text-blue-400'><TwitterIcon /></span>
        } else if(type === 'facebook'){
            return <span className='text-blue-700'><FacebookIcon /></span>
        } else if(type === 'email'){
            return <span className='text-purple-800'><EmailIcon /></span>
        } else if(type === 'twitchtv'){
            return <span className='text-purple-200 text-lg'><Icon icon="logos:twitch" /></span>
        } else if(type === 'tiktok') {
            return <span className='text-xl'><Icon icon="logos:tiktok-icon" /></span>
        } else if(type === 'youtube'){
            return <span className='text-red-500'><YouTubeIcon /></span>
        } else if(type === 'linktree') {
            return <span className='text-green-700 text-xl'><Icon icon="simple-icons:linktree" /></span>
        }
    }

     const nFormat = (num, digits) => {
        const lookup = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "k" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "G" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" }
          ];
          const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
          var item = lookup.slice().reverse().find(function(item) {
            return num >= item.value;
          });
          return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
    }

    const nnFormat = (num) => {
        if(num > 1000000000){
            return ((num / 1000000000).toPrecision(3)) + ' B'
        } else if(num > 1000000) {
            return ((num / 1000000).toPrecision(3)) + ' M'
        } else if(num > 1000) {
            return ((num / 1000).toPrecision(3)) + ' K'
        } else {
            return num
        }
    }

    const dateFormat = (date, key) => {
        let monthStr;
        const [year, month] = date.split("-");
        switch(month){
            case "01":
                monthStr="January";
                break;
            case "02":
                monthStr="February";
                break;
            case "03":
                monthStr="March";
                break;
            case "04":
                monthStr="April";
                break;
            case "05":
                monthStr="May";
                break;
            case "06":
                monthStr="June";
                break;
            case "07":
                monthStr="July";
                break;
            case "08":
                monthStr="August";
                break;
            case "09":
                monthStr="September";
                break;
            case "10":
                monthStr="October";
                break;
            case "11":
                monthStr="November";
                break;
            case "12":
                monthStr="December";
                break;
        }
        const dateStr = `${monthStr}, ${year}`;
        if(key === 0) {
            return monthStr
        } else {
            return dateStr;
        }
    }

    const formatYaxis = (value) => {
        return nFormat(value)
    }

    const formatXaxis = (value) => {
        return dateFormat(value, 0)
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="bg-gray-100 border-none p-3">
              <p className="text-md text-slate-800">{`${dateFormat(label)} : ${payload[0].value}`}</p>
              <p className="text-sm text-slate-400">Record of data over last few months</p>
            </div>
          );
        }
      
        return null;
      };

    const selectCredibilityCard = (typeClass) => {
        if(typeClass === 'bad') {
            return "bg-red-400"
        }
        else if(typeClass === 'good') {
            return "bg-green-400"
        } else if(typeClass === 'normal'){
            return "bg-blue-400"
        } else if(typeClass === 'low'){
            return "bg-yellow-400"
        }
    }

    const mapCredibilityTypes = (code) => {if(code === 'mass_followers'){return "Mass Followers"}
    else if(code ==='suspicious'){return "Suspicious Followers"}
    else if(code ==='influencers'){return "Influencers Followers"}
    else if(code === 'real'){return "Normal Followers"}}

    const appendFormat = (type) => {
        if(type === 'instagram') {
            return (
                <>

                    <div className='grid grid-cols-4 gap-1 mr-2'>
                        <div className={`${floatStyles} p-3 m-3 text-center`}>
                            <h1 className='text-sm text-slate-700 font-bold'>Top Hashtags</h1>
                            
                            {result.user_profile.top_hashtags.map((hashtag) => (
                                <div key={hashtag.tag} className='flex justify-between text-[12px] font-bold text-slate-500 p-[0.2rem]'>
                                    <p>{hashtag.tag}</p>
                                    <p>{(hashtag.weight * 100).toPrecision(3)}%</p>
                                </div>
                            ))}                        
                        </div>
                        <div className={`${floatStyles} p-3 m-3 text-center`}>
                            <h1 className='text-sm text-slate-700 font-bold'>Top Mentions</h1>
                            
                            {result.user_profile.top_mentions.map((hashtag) => (
                                <div key={hashtag.tag} className='flex justify-between text-[12px] font-bold text-slate-500 p-[0.2rem]'>
                                    <p>{hashtag.tag}</p>
                                    <p>{(hashtag.weight * 100).toPrecision(3)}%</p>
                                </div>
                            ))}    
                        </div>
                        <div className={`${floatStyles} p-1 col-span-2 m-3 flex items-stretch`}>
                            <div className='grid grid-cols-2 gap-1 items-stretch justify-center w-full'>
                                <div className=' col-span-2 items-center text-[14px] border-b-1'>
                                    <div className='m-2 text-sm font-bold text-center'>
                                        <h1>Followers by past few months</h1>
                                    </div>
                                    <ResponsiveContainer width="99%" aspect={3} className=" flex items-center p-0 mt-[-20px] ml-[-10px]">
                                        <LineChart
                                            className='flex flex-grow text-center mx-auto ml-1.5'
                                            width={300}
                                            height={500}
                                            data={result.user_profile.stat_history}
                                        >
                                            <CartesianGrid strokeDasharray="5 5" horizontal="true" vertical=""/>
                                            <XAxis tickFormatter={formatXaxis} tickSize={5} dataKey="month" />
                                            <YAxis tickFormatter={formatYaxis} tickLine={false} axisLine={false}/>
                                            <Tooltip content={<CustomTooltip />}/>
                                            <Line
                                                type="monotone"
                                                dataKey="followers"
                                                stroke="#8884d8"
                                                activeDot={{ r: 8 }}
                                            />

                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className='col-span-2  items-center text-[14px]'>
                                    <div className='m-2 text-sm font-bold text-center'>
                                        <h1>Followings by past few months</h1>
                                    </div>
                                    <ResponsiveContainer width="99%" aspect={3} className=" flex items-center p-0 mt-[-20px] ml-[-10px]">
                                    <LineChart
                                            className='flex flex-grow text-center mx-auto ml-1.5'
                                            width={300}
                                            height={500}
                                            data={result.user_profile.stat_history}
                                        >
                                            <CartesianGrid strokeDasharray="5 5" horizontal="true" vertical=""/>
                                            <XAxis dataKey="month" tickFormatter={formatXaxis} tickSize={5}/>
                                            <YAxis tickLine={false} axisLine={false}/>
                                            <Tooltip content={<CustomTooltip />}/>
                                            <Line type="monotone" stroke="#82ca9d"
                                                dataKey="following"
                                                activeDot={{ r: 8 }}/>
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='grid grid-cols-4 gap-3 p-4'>
                                <div className={`${floatStyles} p-3 col-span-2 text-sm`}>
                                    <div className='m-2 text-sm font-bold text-center'>
                                        <h1>Average likes over past few months</h1>
                                    </div>
                                    <ResponsiveContainer width="99%" aspect={3} className=" flex items-center ml-[-10px] mb-10">
                                    <AreaChart
                                            className='flex flex-grow text-center mx-auto ml-1.5'
                                            width={300}
                                            height={500}
                                            data={result.user_profile.stat_history}
                                        >   
                                            <defs>
                                                <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="5 5" horizontal="true" vertical=""/>
                                            <XAxis dataKey="month" tickFormatter={formatXaxis} tickSize={5}/>
                                            <YAxis tickFormatter={formatYaxis} tickLine={false} axisLine={false}/>
                                            <Tooltip content={<CustomTooltip />}/>
                                            <Area type="monotone" dataKey="avg_likes" stroke="#8884d8" fillOpacity={1} fill="url(#areaColor)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className={`${floatStyles} p-3 `}>
                                    <div className='m-2 text-sm font-bold text-center'>
                                        <h1>Brand Affinity</h1>
                                    </div>
                                    <ul className='list-none'>
                                        {result.user_profile.brand_affinity.map((brand) => (
                                            <li key={brand.id} className='text-[12px] font-bold text-slate-500 p-[0.2rem]'>{brand.name}</li>
                                        ))}
                                    </ul>

                                </div>
                                <div className={`${floatStyles} p-3 `}>
                                    <div className='m-2 text-sm font-bold text-center'>
                                        <h1>Interests</h1>
                                    </div>
                                    <div className='items-center'>
                                        <ul className='list-none'>
                                            {result.user_profile.interests.map((interest) => (
                                                <li key={interest.id} className='text-[12px] font-bold text-slate-500 p-[0.2rem]'>{interest.name}</li>
                                            ))}
                                        </ul>
                                    </div>

                                </div>
                        </div>
                    </div>
                    {/* Audience insights by followers */}
                    <div className='p-4'>
                        <h1 className='text-xl text-slate-600'><span className='font-bold'>Audience Insights</span> by followers</h1>
                        <hr />
                    </div>
                    {result.audience_followers.success ? (
                    <>
                        <div className='flex m-3 flex-shrink'>
                            <div className='grid grid-cols-2 gap-3 text-center'>
                                <div className={`col-span-2 flex justify-center`}>
                                    <FollowerGraphic className=" w-[200px] h-[200px] flex-no-shrink fill-current" />
                                </div>
                                <div className={`${floatStyles} p-3`}>
                                    <div>
                                        <h1 className='text-sm text-gray-500 font-bold'>Notable Audience Followers Ratio</h1>
                                    </div>
                                    <p className='mt-2 text-[32px]'>{(result.audience_followers.data.notable_users_ratio * 100).toPrecision(3)}%</p>
                                </div>
                                <div className={`${floatStyles} p-3`}>
                                    <div>
                                        <h1 className='text-sm text-gray-500 font-bold'>Audience Credibility</h1>
                                    </div>
                                    <p className='mt-2 text-[32px]'>{(result.audience_followers.data.audience_credibility * 100).toPrecision(3)}%</p>
                                </div>
                            </div>
                            <div className={`${floatStyles} p-3 ml-4 grid grid-row-3 gap-3 w-full justify-center rounded-3xl ${selectCredibilityCard(result.audience_followers.data.credibility_class)}`}>
                                <div className='row-span-2 px-10 grid grid-cols-4 gap-5 items-stretch'>
                                    {result.audience_followers.data.audience_types.map((type) => (
                                        <div className=' relative text-center pt-3' key={type.code}>
                                            <h1 className='text-xl text-white font-bold text-center mb-2'>{mapCredibilityTypes(type.code)}</h1>
                                            <hr />
                                            <div className='bg-white bg-opacity-75 w-[130px] h-[130px] flex items-center justify-center rounded-full absolute bottom-[-20px] right-[-10px]'>
                                                <span className='text-center items-center justify-center m-auto text-3xl'>{(type.weight * 100).toPrecision(3)}%</span>
                                            </div>
                                        </div>
                                    ))}
                                    
                                </div>
                                <div className='flex justify-center items-center align-middle p-0 m-0 max-h-fit min-h-fit'>
                                    <div className=' text-white text-3xl flex items-center'>
                                        <h1 className='items-center justify-center'>Credibility Class:</h1>
                                    </div>

                                    <div className='ml-3 p-3 flex text-3xl text-white capitalize items-center bg-white bg-opacity-50 rounded-lg'>
                                        <h1>{result.audience_followers.data.credibility_class}</h1>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className='grid grid-cols-2 m-4'>
                                <div className={`${floatStyles} p-3`}>
                                        
                                </div>
                        </div>
                    </>    
                    ) : (
                        <div>
                            <h1 className='text-md text-slate-500 text-center'>Please try again later, we are still collecting data for this account!</h1>
                        </div>
                    )}
                    {/* Audience insights by likers */}
                    <div className='p-4'>
                        <h1 className='text-xl text-slate-600'><span className='font-bold'>Audience Insights</span> by likers</h1>
                        <hr />
                    </div>
                    {result.audience_likers.success ? (
                        <div className='p-4'>
                            
                        </div>
                    ) : (
                        <div>
                            <h1 className='text-md text-slate-500 text-center'>Please try again later, we are still collecting data for this account!</h1>
                        </div>
                    )}
                    {/* Audience insights by commentors */}
                    <div className='p-4'>
                        <h1 className='text-xl text-slate-600'><span className='font-bold'>Audience Insights</span> by commentors</h1>
                        <hr />
                    </div>
                    {result.audience_likers.success ? (
                        <div className='p-4'>
                            
                        </div>
                    ) : (
                        <div>
                            <h1 className='text-md text-slate-500 text-center'>Please try again later, we are still collecting data for this account!</h1>
                        </div>
                    )}
                </>
            )
        } else if(type === 'youtube'){
           return (
            <div>

            </div>
           )
        }
    } 

  return (
    <>
        <div className='mt-12'>
            <div className='flex flex-wrap lg:flex-nowrap justify-center'>
                <div className={`${floatStyles} w-[40rem] lg:w-[60rem] p-8 pt-9 m-3`}>
                    <div className='flex justify-start '>
                        <div >
                            <img src={result.user_profile.picture} alt="creator avatar" className='h-[8rem] w-[8rem] rounded-full' />
                        </div>
                        <section className='ml-[2rem w-full px-[1rem]'>
                            <div className='flex w-full justify-between'>
                                <div>
                                    {checkType(result.user_profile.type)}
                                    <span className='ml-2 text-lg sm:text-sm'>{result.user_profile.fullname}</span>
                                </div>
                                <div className='text-gray-500 flex sm:text-sm items-center justify-center gap-1'>
                                    <LocationOnIcon />
                                    <span>{(result.user_profile.geo.city) ? (`${result.user_profile.geo.city.name}, `) : ''}</span>
                                    <span>{(result.user_profile.geo.state) ? `${result.user_profile.geo.state.name}, ` : ''}</span>
                                    <span>{result.user_profile.geo.country.name}</span>
                                </div>
                            </div>
                            
                            <a className='cursor:pointer underline' href={result.user_profile.url} rel="noreferrer" target="_blank">
                                <h1 className='text-3xl bold mt-3 items-center sm:text-2xl sm:mt-2'>
                                    {result.user_profile.type === "youtube" ? '' : '@'}
                                    {result.user_profile.username}
                                    {result.user_profile.is_verified && <VerifiedIcon className='text-blue-500 ml-2'/>}
                                </h1>
                            </a>
                            <h3  className='mt-5 sm:text-14'>
                                {result.user_profile.description}
                            </h3>

                        </section>
                    </div>
                    
                    
                </div>
            </div>
            <div className='mt-3 flex flex-wrap justify-center flex-col gap-3 p-5 min-h-fit'>
                <div>
                    <div>
                        <h1 className='text-xl text-gray-600 font-bold'>Profile Information</h1>
                        <hr />
                    </div>
                    <div className='flex gap-2 lg:flex-nowrap justify-center mt-3'>

                        <div className='grid grid-cols-4 gap-2 w-[70%] '>
                            <div className={`${floatStyles} p-3 text-center items-center`}>
                                <div>
                                    <h1 className='text-sm text-gray-500 font-bold'>{result.user_profile.type === 'youtube' ? 'Subscribers' : 'Followers'}</h1>
                                </div>
                                <p className='mt-2 text-[32px]'>{(result.user_profile.followers / 1000000).toPrecision(3)}M</p>
                            </div>
                            <div className={`${floatStyles} p-3 text-center items-center`}>
                                <div>
                                    <h1 className='text-sm text-gray-500 font-bold'>Total Posts</h1>
                                </div>
                                <p className='mt-2 text-[32px]'>{result.user_profile.posts_count}</p>
                            </div>
                            {result.user_profile.type === 'instagram' ? (
                                <div className={`${floatStyles} p-3 text-center items-center`}>
                                    <div>
                                        <h1 className='text-sm text-gray-500 font-bold'>Paid Post Performance</h1>
                                    </div>
                                    <p className='mt-2 text-[32px]'>{(result.user_profile.paid_post_performance) ? (result.user_profile.paid_post_performance).toPrecision(3) : '--'}</p>
                                </div>
                            ) : (
                                <div className={`${floatStyles} p-3 text-center items-center`}>
                                    <div>
                                        <h1 className='text-sm text-gray-500 font-bold'>Engagements</h1>
                                    </div>
                                    <p className='mt-2 text-[32px]'>{(result.user_profile.engagements / 1000).toPrecision(3)} K</p>
                                </div>
                            )}
                            <div className={`${floatStyles} p-3 text-center items-center`}>
                                <div>
                                    <h1 className='text-sm text-gray-500 font-bold'>Average Likes</h1>
                                </div>
                                <p className='mt-2 text-[32px]'>{(nnFormat(result.user_profile.avg_likes))}</p>
                            </div>
                            
                            <div className={`${floatStyles} p-3 text-center items-center`}>
                                <div>
                                    <h1 className='text-sm text-gray-500 font-bold'>Average Comments</h1>
                                </div>
                                <p className='mt-2 text-[32px]'>{nnFormat(result.user_profile.avg_comments)}</p>
                            </div>
                            <div className={`${floatStyles} p-3 text-center items-center`}>
                                <div>
                                    <h1 className='text-sm text-gray-500 font-bold'>Average Viewcount</h1>
                                </div>
                                <p className='mt-2 text-[32px]'>{(result.user_profile.avg_views) ? nnFormat(result.user_profile.avg_views) : '--'}</p>
                            </div>
                            {result.user_profile.type === 'instagram' ? (
                                <div className={`${floatStyles} p-3 text-center items-center `}>
                                    <div>
                                        <h1 className='text-sm text-gray-500 font-bold'>Average Reels Plays</h1>
                                    </div>
                                    <p className='mt-2 text-[32px]'>{(result.user_profile.avg_reels_plays) ? (nnFormat(result.user_profile.avg_reels_plays)) : '--'}</p>
                                </div>
                            ) : (
                                <div className={`${floatStyles} p-3 text-center items-center `}>
                                    <div>
                                        <h1 className='text-sm text-gray-500 font-bold'>Total Views</h1>
                                    </div>
                                    <p className='mt-2 text-[32px]'>{result.user_profile.type === 'youtube' ? ((result.user_profile.total_views / 1000000000).toPrecision(3) + ' B') : '--'}</p>
                                </div>
                            )}
                            <div className={`${floatStyles} p-3 text-center items-center`}>
                                <div>
                                    <h1 className='text-sm text-gray-500 font-bold'>Engagement Rate</h1>
                                </div>
                                <p className='mt-2 text-[32px]'>{(result.user_profile.engagement_rate * 100).toPrecision(3)}%</p>
                            </div>
                        </div>
                        <div className='flex flex-wrap'>
                            <div className={`${floatStyles} row-span-2 p-3 justify-center mr-2`}>
                                    <div>
                                        <h1 className='text-sm text-gray-500 font-bold'>Contacts</h1>
                                    </div>
                                    {result.user_profile.contacts.map((contact) => (
                                        <div key={contact.type} className='text-sm mt-2'>
                                            <a href={contact.formatted_value} rel="noreferrer" target="_blank">
                                                <span className='flex text-sm items-center'>
                                                    {contactType(contact.type)}
                                                    <p className='ml-1'>{contact.formatted_value}</p>
                                                    {contact.checked ? (<VerifiedIcon className='text-blue-500 ml-1'/>) : ''}
                                                </span>
                                                
                                            </a>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        
                    </div>
                </div>
                
                
            </div>
            {/* Below section */}
            <div>
                {appendFormat(result.user_profile.type)}
            </div>
        </div>
    </>
  )
}

export default Insights