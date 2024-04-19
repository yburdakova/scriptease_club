import { useState,useEffect } from 'react'
import useFavicon from './hooks/useFavicon';
import './App.css';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MotionPathPlugin from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

function App() {

  useFavicon();
  const width = window.innerWidth;

  const [smallScreen, setSmallScreen] = useState(false)

  useEffect(()=> {
    width < 1024 && setSmallScreen(true)
  }, [width])

  useEffect (()=> {
    const races = document.querySelector(".races");
console.log(races.offsetWidth)

function getScrollAmount() {
	let racesWidth = races.scrollWidth;
	return -(racesWidth - window.innerWidth);
}

const tween = gsap.to(races, {
	x: getScrollAmount,
	duration: 3,
	ease: "none",
});


ScrollTrigger.create({
	trigger:".racesWrapper",
	start:"top 20%",
	end: () => `+=${getScrollAmount() * -1}`,
	pin:true,
	animation:tween,
	scrub:1,
	invalidateOnRefresh:true,
	markers: false
})

    gsap.set("#motionSVG", { scale: 0.7, autoAlpha: 1 });
    gsap.set(".marker", {transformOrigin: "50% 50%"});
    let rotateTo = gsap.quickTo(".marker", "rotation"),
        prevDirection = 0;

    gsap.to("#motionSVG", {
      scrollTrigger: {
        trigger: "#motionPath",
        start: "top center ",
        end: 'bottom center',
        scrub: 0.5,
        markers: false,
        onUpdate: self => {
          if (prevDirection !== self.direction) { 
            rotateTo(self.direction === 1 ? 0 : -180);
            prevDirection = self.direction;
          }
        }
      },
      ease: pathEase("#motionPath"), 
      immediateRender: true,
      motionPath: {
        path: "#motionPath",
        align: "#motionPath",
        alignOrigin: [0.5, 0.5],
        autoRotate: 90,
      }
    });

    const createPulse = (selector, trigger) => {

      gsap.set(selector, { scale: 0, autoAlpha: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top center",
          end: "bottom center",
          scrub: true,
          markers: false,
          onEnter: () => gsap.to(selector, { scale: 2, autoAlpha: 1, ease: "elastic(2.5, 1)" }),
          onLeave: () => gsap.to(selector, { scale: 1, autoAlpha: 1 }),
          onEnterBack: () => gsap.to(selector, { scale: 2, autoAlpha: 1, ease: "elastic(2.5, 1)" }),
          onLeaveBack: () => gsap.to(selector, { scale: 1, autoAlpha: 1 }),
        },
      });
    };

    createPulse(".ball01", "#circle1");
    createPulse(".ball02", "#circle2");
    createPulse(".ball03", "#circle3");
    createPulse(".ball04", "#circle4");
    createPulse(".ball05", "#circle5");


    const jobs = document.querySelectorAll('.job');
    jobs.forEach(job => {
      gsap.set(job, {autoAlpha: 0});

      gsap.fromTo(job, {
        autoAlpha: 0,
      }, {
        scrollTrigger: {
          trigger: job.parentNode,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse",
          markers: false
        },
        autoAlpha: 1,
        duration: 0.5,
        ease: "power1.inOut",
        once: true,
      });
    });

    // Очистка эффекта
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf('.ball01, .ball02, .ball03, .ball04, .ball05', '.job');
    };

  },[])


  return (
    <div className="App">
      <h1>Scriptease Club</h1>
      <hr/>
      <div class="space"></div>
      <div class="racesWrapper">
        <div class="races">
          <h2 >what is</h2>
          <h2 >storytelling</h2>
          <h2> </h2>
          <h2> </h2>
        </div>
      </div>

      <div className="timeline-container">
        <div className="time-item">
          <div className="year year1">2010</div>
          <div className="line"></div>
          <div className="job">
            <div className="position">Coffe-maker</div>
            <div className="title">Firma LLC</div>
            <div className="desctiption">Я так хорошо варил кофе, что программисты стали пускать меня за компьютер. Я начал замечать ошибки не только в работе кофемашины, но и в нашем корпоративном сайте, и решил, что искать баги  - это моё призвание. </div>
          </div>
        </div>
        <div className="time-item">
          <div className="year">2014</div>
          <div className="line"></div>
          <div className="job">
            <div className="position">QA-engineer</div>
            <div className="title">Company LLC</div>
            <div className="desctiption">Я быстро освоил искусство ловли багов. Но жизнь была не так уж и весела, когда все, что ты делаешь целый день - это ищешь проблемы там, где их не видно глазом. Иногда мне казалось, что я работаю детективом в мире, где преступник всегда на шаг впереди. </div>
          </div>
        </div>
        <div className="time-item">
          <div className="year">2017</div>
          <div className="line"></div>
          <div className="job">
            <div className="position">Senior QA-engineer</div>
            <div className="title">Firma LLC</div>
            <div className="desctiption">Я научился находить любую ошибку и нашел самую большую -  свое решение стать QA. После трёх лет разглядывания чужих ошибок, я решил, что пора начать делать свои собственные. Так я стал фронтенд разработчиком.</div>
          </div>
        </div>
        <div className="time-item">
          <div className="year">2022</div>
          <div className="line"></div>
          <div className="job">
            <div className="position">Front-end developer</div>
            <div className="title">Company LLC</div>
            <div className="desctiption">Каждый мой проект стал тестом на выживаемость интерфейсов в дикой природе браузеров. <br/>Моим спасением стала фраза "Странно! У меня все работает!"</div>
          </div>
        </div>
        <div className="time-item">
          <div className="year">2024</div>
          <div className="line"></div>
          <div className="job">
            <div className="position">Senior Front-end developer</div>
            <div className="title">Great FAANG LLC</div>
            <div className="desctiption desctiption1">Чему я научился на позиции старшего инженера? Если ты не можешь заставить код работать как надо, назови это фичей</div>
          </div>
        </div>
        <div className="blurebox"></div>
        <svg className="animation-box" width="358" height="2667" viewBox="0 0 358 2667" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="time-scroll">
          <circle className="ball ball01" id="circle1" cx="169" cy="240" r={smallScreen? "16": "20"}/>
          <circle className="ball ball02" id="circle2" cx="169" cy="726" r={smallScreen? "16": "20"} />
          <circle className="ball ball03" id="circle3" cx="169" cy="1208" r={smallScreen? "16": "20"} />
          <circle className="ball ball04" id="circle4" cx="169" cy="1692" r={smallScreen? "16": "20"} />
          <circle className="ball ball05" id="circle5" cx="169" cy="2178" r={smallScreen? "16": "20"} />
          <path class="path-way" id="motionPath" d="M5.99987 1.5C205.167 -2.33333 519.9 39.7 185.5 238.5C-148.9 437.3 46.1665 642.667 185.5 720.5C243.5 744.5 352.9 803 326.5 845C293.5 897.5 -4.00774 926.392 33 1020C58.5 1084.5 160 1169 185.5 1210.5C257.5 1244.83 391.6 1327.3 352 1382.5C302.5 1451.5 60 1470 46.5 1544.5C35.7 1604.1 134.667 1670 185.5 1695.5C282 1724.5 414.4 1824.5 316 1878.5C193 1946 15 1947.5 15 2011.5C15 2060.47 133.167 2128.5 185.5 2173.5"  />
        </g>

        </svg>
        <svg className="paperplan" width="430" height="2667" viewBox="0 0 430 2667" xmlns="http://www.w3.org/2000/svg">
          <g id="motionSVG">
          <path className="marker" d="M29.3,2.6c-0.3-0.2-0.7-0.3-1-0.2L3,11.7c-0.4,0.1-0.7,0.5-0.7,0.9c0,0.4,0.3,0.8,0.7,0.9l10.2,3.8l10-10
    c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-9.8,9.8l6.6,10.6c0.2,0.3,0.5,0.5,0.8,0.5c0.1,0,0.1,0,0.2,0c0.4-0.1,0.7-0.4,0.8-0.7l6.2-25.2
    C29.7,3.3,29.6,2.9,29.3,2.6z"/>
          </g>
        </svg>

      </div>
    </div>

  );
}

export default App;

function pathEase(path, config={}) {
  let axis = config.axis || "y",
      precision = config.precision || 1,
      rawPath = MotionPathPlugin.cacheRawPathMeasurements(MotionPathPlugin.getRawPath(gsap.utils.toArray(path)[0]), Math.round(precision * 12)),
			useX = axis === "x",
			start = rawPath[0][useX ? 0 : 1],
			end = rawPath[rawPath.length - 1][rawPath[rawPath.length-1].length - (useX ? 2 : 1)],
			range = end - start,
			l = Math.round(precision * 200),
			inc = 1 / l,
			positions = [0],
			a = [],
			minIndex = 0,
      smooth = [0],
      minChange = (1 / l) * 0.6,
      smoothRange = config.smooth === true ? 7 : Math.round(config.smooth) || 0,
      fullSmoothRange = smoothRange * 2,
			getClosest = p => {
				while (positions[minIndex] <= p && minIndex++ < l) { }
				a.push((p - positions[minIndex-1]) / (positions[minIndex] - positions[minIndex - 1]) * inc + minIndex * inc);
        smoothRange && a.length > smoothRange && (a[a.length - 1] - a[a.length - 2] < minChange) && smooth.push(a.length - smoothRange);
			},
			i = 1;
  for (; i < l; i++) {
    positions[i] = (MotionPathPlugin.getPositionOnPath(rawPath, i / l)[axis] - start) / range;
  }
  positions[l] = 1;
  for (i = 0; i < l; i++) {
    getClosest(i / l);
  }
  a.push(1); 
  if (smoothRange) { 
    smooth.push(l-fullSmoothRange+1);
    smooth.forEach(i => {
      let start = a[i],
          j = Math.min(i + fullSmoothRange, l),
          inc = (a[j] - start) / (j - i),
          c = 1;
      i++;
      for (; i < j; i++) {
        a[i] = start + inc * c++;
      }
    });
  }
  return p => {
    let i = p * l,
        s = a[i | 0];
    return i ? s + (a[Math.ceil(i)] - s) * (i % 1) : 0;
  }
}