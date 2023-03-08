import {
  useState,
  useEffect,
} from "react";
import './index.css'
import axios from 'axios';
import timeGap from "@/utils/timeGap";
import '@/mock/date.js';

// const languageTime: Record<string, string[]> = {
//   'zh-CN': ['时', '分', '秒'],
//   'en-US': ['h', 'm', 's']
// }

const languageButton : Record<string, string> = {
    'zh-CN': '¡Lo quiero!',
    'en-US': 'I want it!'
  }

export default function CouponBanner() {
  const [timeArr, setTimeArr] = useState(['00', '00', '00'])
  const [lock, setLock] = useState(true)
  const [language, setLanguage] = useState('en-US')

  let timer: string | number | NodeJS.Timeout | undefined;
  useEffect(() => {
    // react 18 useEffect 执行两次
    if (lock) {
      setLock(false)
      axios.get('/getLanguage').then(res=>{
        setLanguage(res.data)
      })
      axios.get('/getTime').then(res => {
        let nowTime: number = new Date(res.data.nowTime).getTime();
        let targetTime: number = new Date(res.data.targetTime).getTime();
        timer = setInterval(() => {

          setTimeArr(timeGap(nowTime += 1000, targetTime) as string[]);

          if (nowTime === 0) clearInterval(timer)
        }, 1000)
      })
    }
    return () => {
      clearInterval(timer)
    }
  }, [])
  console.log(timeArr)
  return (
    <div className="content">
      <div className="txt"></div>
      <div className="card">
        <div className="button">{languageButton[language]}</div>
      </div>
      <div className="countdown">
        <div style={{flexGrow:1}}>Ends in</div>
        {timeArr.map((v, index) => (
          <div key={index} style={{display:'flex',alignItems:'center'}}>
            <div className="timeitem">{v}</div>
            <span>{['h', 'm', 's'][index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
