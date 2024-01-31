import { Display } from "./components/Display";
import { Keypad } from "./components/Keypad";

function App() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-gray-950 text-white">
      <div className="flex w-[375px] flex-col gap-5 rounded-md  p-4 pt-10 outline outline-gray-700">
        <Display />
        <Keypad />
      </div>
      <p className="text-cyan-400">Designed and coded by CyanDev</p>
    </div>
  );
}

export default App;
