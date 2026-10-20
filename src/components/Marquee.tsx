import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

const Marquee = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products")
    const data = await res.json()
    
    console.log(data)
    return (
        <div className="bg-white text-black">
            <MarqueeText direction="right" duration={13}>
            { data.map(headline =>
                <span key={headline.id} className="mx-4 flex gap-3 font-semibold ">
                        
                    <span>{headline.image}</span>
                    <span className="gap-4">{headline.nameBn}</span>
                    <span className="gap-4">{headline.today}</span>
                    <span>{headline.unit}</span>
                           
                           <span>{headline.change.dir < 0 ? "▼" : "▲"}</span>
                           <span>{headline.change.pct  }%</span>
             
                </span>
                
            )}
            </MarqueeText>

        </div>
    );
};

export default Marquee;