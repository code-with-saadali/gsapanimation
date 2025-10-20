import { Dashboard } from "./_components/Dashboard";
import Example from "./_components/Example";
import { Example10 } from "./_components/Example10";
import Example2 from "./_components/Example2";
import { Example3 } from "./_components/Example3";
import Example4 from "./_components/Example4";
import { Example5 } from "./_components/Example5";
import { Example6 } from "./_components/Example6";
import { Example7 } from "./_components/Example7";
import Example8 from "./_components/Example8";
import { Example9 } from "./_components/Example9";
// import HeroSection from "./_components/HeroSection";
import InfiniteMarquee from "./_components/InfiniteMarquee";
import Slider from "./_components/Slider";
import TrippyScroll from "./_components/Trippyscrool";

export default function Home() {
  return (
    <main>
      {/* <HeroSection/> */}
      <Slider/>
      <InfiniteMarquee />
      <Example />
      <Example2 />
      <Example3 />
      <TrippyScroll />
      <Dashboard />
      <Example4 />
      <Example5 />
      <Example6 />
      <Example7 />
      <Example8 />
      <Example9 />
      <Example10/>
    </main>
  );
}
